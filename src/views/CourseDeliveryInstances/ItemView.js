import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import SchoolIcon from '@material-ui/icons/School';
import MoreIconButton from '@components/MoreIconButton';
import { dispdate } from '@lib/dispdate';

export default function CourseDeliveryInstanceItem({ id, picture, ...item }, { menu }) {
  const { creationDate, startDate, enrollmentEndDate } = item;
  const secondary = `Создан: ${dispdate(creationDate)}${startDate ? ', начало: ' + dispdate(startDate) : ''}${enrollmentEndDate ? ', окончание регистрации: ' + dispdate(enrollmentEndDate) : ''}`;

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><SchoolIcon /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={item.name} secondary={secondary} />
    <ListItemSecondaryAction>
      <MoreIconButton onClick={event => menu.open(event, { id, item })} />
    </ListItemSecondaryAction>
  </ListItem>;
}