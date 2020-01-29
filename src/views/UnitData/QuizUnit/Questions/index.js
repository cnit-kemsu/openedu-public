import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useFieldArray } from '@kemsu/form';
import { List, useElementArray } from '@kemsu/core';
import { QuestionItem } from './QuestionItem';
import useStyles from './styles';

const keyProp = ({ key }) => key;

//[{ answerOptions: [null, 'Необходимо указать правильный ответ'] }, null]

function correctAnswer(count, value) {
  if (value.correct) return count + 1;
  return count;
}

function validateQuestions(value) {
  if (value == null || value?.length === 0) return [null, 'Необходимо добавить хотя бы один вопрос'];
  const errors = [];
  for (const index in value) {
    const question = value[index];
    const answerOptions = question.answerOptions;
    if (answerOptions == null || answerOptions?.length < 2) errors[index] = [null, 'Необходимо добавить хотя бы два ответа'];

    if (question.type === 'SingleChoice' && (question.correctAnswerIndex == null || question.correctAnswerIndex === '')) errors[index] = [null, 'Необходимо указать правильный ответ'];
    if (question.type === 'MultipleChoice' && !question.correctAnswerIndex) {   
      const correctAnswersCount = answerOptions.reduce(correctAnswer, 0);
      if (correctAnswersCount === 0) errors[index] = [null, "Необходимо указать хотя бы один ответ 'правильным'"];
      if (correctAnswersCount === answerOptions.length) errors[index] = [null, "Необходимо указать хотя бы один ответ 'неправильным'"];
    }
  }
  return [errors, null];
}

function Questions({ createQuestionDialog, ...props }) {
  const [questions, { push, error, dirty, touched, onBlur }] = useFieldArray(null, 'data.questions', validateQuestions);
  //const questionItems = useElementArray(QuestionItem, [...questions], { key: keyProp, ...props });
  const questionItems = questions.map((question, index) => <QuestionItem key={index} element={question} {...props} />);

  const classes = useStyles();
  return <>
    <div onBlur={onBlur}>
      {questions.length > 0 && <List>
        {questionItems}
      </List>}
    </div>
    {(error && touched && dirty) && <Typography color="error">{error}</Typography>}

    <Button data-control size="small" variant="contained" color="primary" className={classes.addQuestionButton} onClick={() => createQuestionDialog.open({ push })}>
      <AddIcon className={classes.addIcon} />
      Добавить вопрос
    </Button>
  </>;
}

export default React.memo(Questions);