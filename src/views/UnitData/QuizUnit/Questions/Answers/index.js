import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useFieldArray } from '@kemsu/form';
import { List, useElementArray } from '@kemsu/core';
import { AnswerItem } from './AnswerItem';
import useStyles from './styles';

const keyProp = ({ key }) => key;

function correctAnswer(count, value) {
  if (value.correct) return count + 1;
  return count;
}
function validateAnswers(values) {
  if (values == null || values?.length < 2) return [null, 'Необходимо добавить хотя бы два ответа'];
  const correctAnswersCount = values.reduce(correctAnswer, 0);
  if (correctAnswersCount === 0) return [null, "Необходимо указать хотя бы один ответ 'правильным'"];
  if (correctAnswersCount === values.length) return [null, "Необходимо указать хотя бы один ответ 'неправильным'"];
}

function Answers({ createAnswerDialog, questionElement, questionIndex, ...props }) {
  const [answers, { push, error, dirty, touched, onBlur }] = useFieldArray(questionElement, 'answerOptions', validateAnswers);
  const answerItems = useElementArray(AnswerItem, [...answers], { key: keyProp, questionIndex, ...props });
  const showError = error && touched && dirty;

  const classes = useStyles({ count: answers.length, showError });
  return <>
    <div onBlur={onBlur}>
      {answers.length > 0 && <List>
        {answerItems}
      </List>}
    </div>
    {showError && <Typography className={classes.error} color="error">{error}</Typography>}

    <Button data-control size="small" variant="outlined" color="primary" className={classes.addAnswerButton} onClick={() => createAnswerDialog.open({ push, questionIndex })}>
      <AddIcon className={classes.addIcon} />
      Добавить вариант ответ
    </Button>
  </>;
}

export default React.memo(Answers);