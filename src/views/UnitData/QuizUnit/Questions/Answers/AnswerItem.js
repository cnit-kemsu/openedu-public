import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreIconButton from '@components/MoreIconButton';
import { useArrayElement } from '@kemsu/form';

export function AnswerItem(element, { answerMenu }) {
  const { values, onChange } = useArrayElement(element);

  return <ListItem>
    <ListItemText primary={values.text} />
    <ListItemSecondaryAction>
      <MoreIconButton data-control onClick={event => answerMenu.open(event, { element, values, onChange })} />
    </ListItemSecondaryAction>
  </ListItem>;
}