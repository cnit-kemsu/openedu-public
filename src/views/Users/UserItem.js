import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIconButton from '@components/MoreIconButton';
import UserStatus from './UserStatus';

export default function UserItem({ id, role, email, verified, firstname, lastname }, { menu }) {

  return <ListItem>
    <ListItemAvatar>
      <Avatar>
        <AccountCircle />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={email} secondary={firstname + ' ' + lastname} />
    <UserStatus role={role} verified={verified} />
    <ListItemSecondaryAction>
      <MoreIconButton onClick={event => menu.open(event, { id, email })} />
    </ListItemSecondaryAction>
  </ListItem>;
}