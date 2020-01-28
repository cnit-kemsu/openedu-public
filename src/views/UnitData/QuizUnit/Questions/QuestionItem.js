import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import MoreIconButton from '@components/MoreIconButton';
import { useArrayElement } from '@kemsu/form';
import { Editor } from '@kemsu/editor';
import AnswersView from './Answers';
import { QuestionItem as useStyles } from './styles';

export function QuestionItem ({ element, questionMenu, ...props }) {
  const classes = useStyles();

  const { index, values, onChange, error, touched, dirty } = useArrayElement(element);
  console.log('QuestionItem error:', error);
  const showError = error && touched && dirty;
  const questionError = showError && <Typography className={classes.error} color="error">{error}</Typography>;

  const questionIndex = Number(index) + 1;
  return <Paper className={classes.root}>
    <ListItem className={classes.item}>
      <div className={classes.pre}>
        <Typography className={classes.index}>{questionIndex}.</Typography>
      </div>
      <ListItemText className={classes.text} primary={<Editor editorState={values.content} readOnly={true} />} />
      <ListItemSecondaryAction>
        <MoreIconButton data-control onClick={event => questionMenu.open(event, { element, values, onChange, questionIndex })} />
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    <AnswersView questionElement={element} questionIndex={questionIndex} {...props} questionError={questionError} />
  </Paper>;
}