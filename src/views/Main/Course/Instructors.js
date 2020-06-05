import React, { memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { useElementArray, List } from '@kemsu/core';
import displayAvatar from '@lib/displayAvatar';
import { dispstr } from '@lib/dispstr';

function UserItem({ email, firstname, lastname, middlename, picture }) {

  return <ListItem>
    <ListItemAvatar>{displayAvatar(picture)}</ListItemAvatar>
    <ListItemText primary={email} secondary={dispstr(lastname, firstname, middlename)} />
  </ListItem>;
}

function Instructors({ instructors }) {
  const userItems = useElementArray(UserItem, [...instructors], { key: user => user.id });
  return <List>
    {userItems}
  </List>;
}

export default memo(Instructors);