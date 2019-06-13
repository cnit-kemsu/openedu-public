import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useFieldArray } from '@kemsu/form';
import { List, useElementArray } from '@kemsu/core';
import { QuestionItem } from './QuestionItem';
import useStyles from './styles';

const keyProp = ({ key }) => key;

function validateQuestions(value) {
  if (value == null || value?.length === 0) return [null, 'Необходимо добавить хотя бы один вопрос'];
}

function Questions({ createQuestionDialog, ...props }) {
  const [questions, { push, error, dirty, touched, onBlur }] = useFieldArray(null, 'data.questions', validateQuestions);
  const questionItems = useElementArray(QuestionItem, [...questions], { key: keyProp, ...props });

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