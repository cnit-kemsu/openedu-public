import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreIconButton from '@components/MoreIconButton';

export default function UserItem({ id, name, summary }, { menu }) {

  return <ListItem>
    <ListItemText primary={name} secondary={summary} />
    <ListItemSecondaryAction>
      <MoreIconButton onClick={event => menu.open(event, { id, name })} />
    </ListItemSecondaryAction>
  </ListItem>;
}