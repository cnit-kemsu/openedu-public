import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import SchoolIcon from '@material-ui/icons/School';
import MoreIconButton from '@components/MoreIconButton';

export default function UserItem({ id, name, summary }, { menu }) {

  return <ListItem>
    <ListItemAvatar>
      <Avatar>
        <SchoolIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={name} secondary={summary} />
    <ListItemSecondaryAction>
      <MoreIconButton onClick={event => menu.open(event, { id, name })} />
    </ListItemSecondaryAction>
  </ListItem>;
}