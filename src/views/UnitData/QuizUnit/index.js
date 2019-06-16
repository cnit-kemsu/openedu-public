import React from 'react';
import { useQuestionItem } from './Questions/useQuestionItem';
import { useAnswerItem } from './Questions/Answers/useAnswerItem';
import Parameters from './Parameters';
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

    <Parameters />
    <QuestionsView {...{ createQuestionDialog, questionMenu, createAnswerDialog, answerMenu }} />

    {questionElements}
    {answerElements}

  </div>;
}
export default React.memo(QuizUnit);