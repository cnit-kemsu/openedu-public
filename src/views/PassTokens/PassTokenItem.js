import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreIconButton from '@components/MoreIconButton';
export default function PassTokenItem({ id, name, comments }, { menu }) {

  return <ListItem>
    <ListItemText primary={name} secondary={comments} />
    <ListItemSecondaryAction>
      <MoreIconButton onClick={event => menu.open(event, { id })} />
    </ListItemSecondaryAction>
  </ListItem>;
}