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
import Picker from '@components/Picker';
import PickerTextField from '@components/PickerTextField';

// export const SEARCH_USERS = ({ search = 'String', excludeKeys = '[Int]' }) => `
//   allUsers(searchText: ${search} excludeKeys: ${excludeKeys} roles: [STUDENT]) {
//     id
//     email
//     lastname
//     firstname
//     middlename
//     picture
//   }
// `;

export const SEARCH_USERS = ({ search = 'String', excludeKeys = '[Int]' }) => `
  allUsers(searchText: ${search} excludeKeys: ${excludeKeys}) {
    id
    email
    lastname
    firstname
    middlename
    picture
  }
`;

function UserSearchItem({ id, lastname, firstname, midllename, email, picture, push, closePicker }) {

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><AccountCircle /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={email} secondary={<>
      {dispstr(lastname, firstname, midllename)}
      <span style={{ cursor: 'pointer', color: '#3f51b5' }} onClick={() => { push({ id, lastname, firstname, midllename, email, picture }); closePicker(); }}>добавить</span>
    </>} />
  </ListItem>;
}

function UserItem({ lastname, firstname, midllename, email, picture, remove }) {

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><AccountCircle /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={email} secondary={dispstr(lastname, firstname, midllename)} />
    <ListItemSecondaryAction>
      <DeleteIconButton onClick={remove} />
    </ListItemSecondaryAction>
  </ListItem>;
}

function UserSearchList({ search, push, closePicker, excludeKeys }) {
  const [{ allUsers }, loading, errors] = useQuery(SEARCH_USERS, { search: search.current, excludeKeys: excludeKeys.current }, { skip: !search.current });

  return <Paper><Loader loading={loading} errors={errors}>
    {allUsers && <List>
      {allUsers.map(user => 
        <UserSearchItem key={user.email} {...user} {...{ push: push.current, closePicker }} />
      )}
    </List>}
  </Loader></Paper>;
}

function EmailList({ setPush, setExcludeKeys }) {

  const [users, { push }] = useFieldArray(null, 'emails');
  setPush(push);
  setExcludeKeys(users);

  return <List>{users.map(user =>
    <UserItem key={user.values.email} {...user.values} remove={user.delete} />
  )}</List>;
}

export default class Emails extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      update: false
    };

    this.picker = React.createRef();

    this.value = { current: null };
    this.openPicker = (currentTarget, value) => {
      this.setState(old => ({ update: !old.update }));
      this.value.current = value;
      this.picker.current.open(currentTarget);
    };

    this.excludeKeys = { current: [] };
    this.setExcludeKeys = courses => {
      this.excludeKeys.current = courses?.map(course => course.values.id) || [];
    };

    this.push = { current: null };
    this.setPush = push => { this.push.current = push; };

    this.closePicker = () => this.picker.current.close();
  }

  render() {
    return <Paper style={{ marginTop: '24px', padding : '12px' }}>

      <Picker ref={this.picker}>
        <UserSearchList search={this.value} push={this.push} excludeKeys={this.excludeKeys} closePicker={this.closePicker} />
      </Picker>

      <PickerTextField style={{ width: '100%', display: 'flex', alignItems: 'center' }} showButton label="Поиск пользователей или эл. почта" onChange={this.openPicker} onClick={email => this.push.current({ email })} />

      <EmailList setPush={this.setPush} setExcludeKeys={this.setExcludeKeys} />

    </Paper>;
  }
}