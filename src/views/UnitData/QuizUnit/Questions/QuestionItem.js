import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreIconButton from '@components/MoreIconButton';
import { useArrayElement } from '@kemsu/form';
import AnswersView from './Answers';
import { QuestionItem as useStyles } from './styles';

export function QuestionItem (element, { questionMenu, ...props }) {
  const { values, onChange } = useArrayElement(element);

  const classes = useStyles();
  return <Paper className={classes.root}>
    <ListItem>
      <ListItemText primary={values.text} />
      <ListItemSecondaryAction>
        <MoreIconButton data-control onClick={event => questionMenu.open(event, { element, values, onChange })} />
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    <AnswersView questionElement={element} {...props} />
  </Paper>;
}