import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useFieldArray } from '@kemsu/form';
import { List, useElementArray } from '@kemsu/core';
import { AnswerItem } from './AnswerItem';
import useStyles from './styles';

const keyProp = ({ key }) => key;

function validateAnswers(value) {
  if (value == null || value?.length < 2) return [null, 'Необходимо добавить хотя бы два ответа'];
}

function Answers({ createAnswerDialog, questionElement, ...props }) {
  const [answers, { push, error, dirty, touched, onBlur }] = useFieldArray(questionElement, 'answers', validateAnswers);
  const answerItems = useElementArray(AnswerItem, [...answers], { key: keyProp, ...props });
  const showError = error && touched && dirty;

  const classes = useStyles({ count: answers.length, showError });
  return <>
    <div onBlur={onBlur}>
      {answers.length > 0 && <List>
        {answerItems}
      </List>}
    </div>
    {showError && <Typography className={classes.error} color="error">{error}</Typography>}

    <Button data-control size="small" variant="outlined" color="primary" className={classes.addAnswerButton} onClick={() => createAnswerDialog.open({ push })}>
      <AddIcon className={classes.addIcon} />
      Добавить ответ
    </Button>
  </>;
}

export default React.memo(Answers);