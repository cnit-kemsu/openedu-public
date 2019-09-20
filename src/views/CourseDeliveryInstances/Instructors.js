import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import SchoolIcon from '@material-ui/icons/School';
import DeleteIconButton from '@components/DeleteIconButton';
import { dispdate } from '@lib/dispdate';
import Popper from '@material-ui/core/Popper';
import { useQuery } from '@kemsu/graphql-client';
import { useFieldArray } from '@kemsu/form';
import { useElementArray, useMenu, useDialog, Loader, List, ListNavigator, MenuModal, DialogModal, Fab } from '@kemsu/core';
import { dispstr } from '@lib/dispstr';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';

class Picker extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      target: null,
      open: false
    };
    this.popper = React.createRef(); 
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  open(target) {
    if (!this.state.open) {
      this.setState({
        target,
        open: true
      });
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }
  
  close() {
    this.onClose();
    this.setState({ target: null, open: false });
  }

  componentWillUnmount() {
    if (this.state.open) this.onClose();
  }

  onClose() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.popper.current.contains(event.target)) this.close();
  }
 
  render() {
    return <Popper ref={this.popper}
      open={this.state.open}
      anchorEl={this.state.target}
    >
      {this.props.children}
    </Popper>;
  }
}

class TimeoutTextField extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    const currentTarget = event.currentTarget;
    const value = currentTarget.value;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.props.onChange({ currentTarget, value }), this.props.timeout || 1000);
  }

  render() {
    const { onChange, timeout, ...props } = this.props;
    return <TextField {...props} onChange={this.onChange} />;
  }
}

export const INSTRUCTORS = ({ search = 'String!' }) => `
  instructors(nameLike: ${search}) {
    id
    email
    firstname
    lastname
    middlename
    picture
  }
`;

export const USERS = ({ keys = 'JSON' }) => `
  users(keys: ${keys}) {
    id
    email
    firstname
    lastname
    middlename
    picture
  }
`;

function UserItem({ id, email, firstname, lastname, middlename, picture }, { push, closePicker }) {

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><AccountCircle /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={email} secondary={<>
      {dispstr(firstname, lastname, middlename) + ' '}
      <span style={{ cursor: 'pointer', color: '#3f51b5' }} onClick={() => { push(id); closePicker(); }}>добавить</span>
    </>} />
  </ListItem>;
}

function UserItem1({ id, email, firstname, lastname, middlename, picture }, { removeKeys }) {

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><AccountCircle /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={email} secondary={dispstr(firstname, lastname, middlename)} />
    <ListItemSecondaryAction>
      <DeleteIconButton onClick={() => removeKeys[id]()} />
    </ListItemSecondaryAction>
  </ListItem>;
}

function InstructorList({ search, push, closePicker }) {
  const [{ instructors }, loading, errors] = useQuery(INSTRUCTORS, { search });
  const userItems = useElementArray(UserItem, instructors, { key: user => user.id, push, closePicker });

  return <Paper><Loader loading={loading} errors={errors}>
    {instructors && <List>
      {userItems}
    </List>}
  </Loader></Paper>;
}

function Instructors1({ _push }) {
  const [instructors, { push }] = useFieldArray(null, 'instructorKeys');
  _push.current = push;
  const _keys = instructors.map(el => el.values);
  const removeKeys = {};
  for (const instr of instructors) removeKeys[instr.values] = instr.delete;
  const keys = React.useMemo(() => _keys, [_keys.length]);

  const [{ users }, loading, errors] = useQuery(USERS, { keys });
  const userItems = useElementArray(UserItem1, users, { key: user => user.id, push, removeKeys });
  return <Loader loading={loading} errors={errors}>
    {users && <List>
      {userItems}
    </List>}
  </Loader>;
}

export default class Instructors extends PureComponent {
  constructor(props) {
    super(props);

    this.picker = React.createRef();
    this.openPicker = this.openPicker.bind(this);
    this.push = { current: null };
  }

  openPicker({ currentTarget, value }) {
    
    this.value = value;
    console.log(this.value);
    if (this.value != null) this.pickerChildren = <InstructorList search={this.value} push={this.push.current} closePicker={this.picker.current.close} />;
    this.picker.current.open(currentTarget);
  }

  render() {
    return <Paper style={{ marginTop: '24px', padding : '12px' }}>
      <Picker ref={this.picker}>
          {() => this.pickerChildren}
      </Picker>
      <TimeoutTextField label="Поиск преподавателей" onChange={this.openPicker} />
      <Instructors1 _push={this.push} />
    </Paper>;
  }
}