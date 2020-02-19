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

export const SEARCH_USERS = ({ search = 'String', excludeKeys = '[Int]' }) => `
  allUsers(searchName: ${search} excludeKeys: ${excludeKeys} defunct: false) {
    id
    name
    creationDate
    picture
  }
`;

function CourseSearchItem({ id, name, creationDate, picture, push, closePicker }) {

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><AccountCircle /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={name} secondary={<>
      {creationDate}
      <span style={{ cursor: 'pointer', color: '#3f51b5' }} onClick={() => { push({ id, name, creationDate, picture }); closePicker(); }}>добавить</span>
    </>} />
  </ListItem>;
}

function CourseItem({ name, picture, creationDate, remove }) {

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><AccountCircle /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={name} secondary={creationDate} />
    <ListItemSecondaryAction>
      <DeleteIconButton onClick={remove} />
    </ListItemSecondaryAction>
  </ListItem>;
}

function CourseSearchList({ search, push, closePicker, excludeKeys }) {
  const [{ allCourses }, loading, errors] = useQuery(SEARCH_COURSES, { search: search.current, excludeKeys: excludeKeys.current }, { skip: !search.current });

  return <Paper><Loader loading={loading} errors={errors}>
    {allCourses && <List>
      {allCourses.map(course => 
        <CourseSearchItem key={course.id} {...course} {...{ push: push.current, closePicker }} />
      )}
    </List>}
  </Loader></Paper>;
}

function CourseList({ setPush, setExcludeKeys }) {

  const [courses, { push }] = useFieldArray(null, 'courseKeys');
  setPush(push);
  setExcludeKeys(courses);

  return <List>{courses.map(course =>
    <CourseItem key={course.values.id} {...course.values} remove={course.delete} />
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
        <CourseSearchList search={this.value} push={this.push} excludeKeys={this.excludeKeys} closePicker={this.closePicker} />
      </Picker>

      <PickerTextField style={{ width: '100%' }} label="Поиск курсов" onChange={this.openPicker} />

      <CourseList setPush={this.setPush} setExcludeKeys={this.setExcludeKeys} />

    </Paper>;
  }
}