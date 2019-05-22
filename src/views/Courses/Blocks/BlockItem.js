import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreIconButton from '@components/MoreIconButton';
import { BlockItem as useStyles } from './styles';

const types = {
  TEXT: 'Текст',
  VIDEO: 'Видео',
  QUIZ: 'Тест'
};

export default function BlockItem({ id, name, summary, type }, { menu, sectionId, courseId, subsectionId }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <ListItem className={classes.listItem}>
      <ListItemText primary={`${name} (${types[type]})`} secondary={summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => menu.open(event, { id, name, summary, sectionId, courseId, subsectionId })} />
      </ListItemSecondaryAction>
    </ListItem>
  </div>;
}