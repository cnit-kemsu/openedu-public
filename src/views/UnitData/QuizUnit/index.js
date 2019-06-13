import React from 'react';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import Button from '@material-ui/core/Button';
// import MoreIconButton from '@components/MoreIconButton';
// import AddIcon from '@material-ui/icons/Add';
// import { useFieldArray, useField } from '@kemsu/form';
// import { List, useElementArray } from '@kemsu/core';
import { useQuestionItem } from './Questions/useQuestionItem';
import { useAnswerItem } from './Questions/Answers/useAnswerItem';
import QuestionsView from './Questions';
import useStyles from './styles';

function QuizUnit() {
  const [
    createQuestionDialog,
    questionMenu,
    questionElements
  ] = useQuestionItem();

  const [
    createAnswerDialog,
    answerMenu,
    answerElements
  ] = useAnswerItem();

  const classes = useStyles();
  return <div className={classes.root}>

    <QuestionsView {...{ createQuestionDialog, questionMenu, createAnswerDialog, answerMenu }} />

    {questionElements}
    {answerElements}

  </div>;
}
export default React.memo(QuizUnit);