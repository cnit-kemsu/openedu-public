import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreIconButton from '@components/MoreIconButton';
import { SubsectionItem as useStyles } from './styles';

export default function SubsectionItem({ id, name, summary }, { menu }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <ListItem className={classes.listItem}>
      <ListItemText primary={name} secondary={summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => menu.open(event, { id, name, summary })} />
      </ListItemSecondaryAction>
    </ListItem>
  </div>;
}