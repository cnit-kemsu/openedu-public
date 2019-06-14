import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import MoreIconButton from '@components/MoreIconButton';
import { useArrayElement } from '@kemsu/form';
import AnswersView from './Answers';
import { QuestionItem as useStyles } from './styles';

export function QuestionItem (element, { questionMenu, ...props }) {
  const { index, values, onChange } = useArrayElement(element);

  const classes = useStyles();
  const questionIndex = Number(index) + 1;
  return <Paper className={classes.root}>
    <ListItem className={classes.item}>
      <div className={classes.pre}>
        <Typography className={classes.index}>{questionIndex}.</Typography>
      </div>
      <ListItemText className={classes.text} primary={values.text} />
      <ListItemSecondaryAction>
        <MoreIconButton data-control onClick={event => questionMenu.open(event, { element, values, onChange, questionIndex })} />
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    <AnswersView questionElement={element} questionIndex={questionIndex} {...props} />
  </Paper>;
}