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

export default function BlockItem({ index, id, name, summary, type }, { blockMenu, subsectionIndex, ...props }) {

  const classes = useStyles();
  const blockIndex = index + 1 |> subsectionIndex + '.' + #;
  const primary = <>
    <span className={classes.index}>{blockIndex}</span>. {name} ({types[type]})
  </>;
  return <div>
    <ListItem>
      <ListItemText primary={primary} secondary={summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => blockMenu.open(event, { id, name, summary, subsectionIndex, ...props })} />
      </ListItemSecondaryAction>
    </ListItem>
  </div>;
}