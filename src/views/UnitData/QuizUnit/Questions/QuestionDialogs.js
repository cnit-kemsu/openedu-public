import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { FormDialog, ConfirmDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import updateSubmitProps from '@components/updateSubmitProps';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { QuestionForm as useStyles } from './styles';

function validateText(value) {
  if (!value) return 'Текст вопроса не должен быть пустым';
}

export function CreateQuestionDialog(close, { push }) {
  const form = useForm(push, null, null, close);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Новый вопрос" {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.text} name="text" multiline rows={6} validate={validateText} label="Текст вопроса"/>
    </div>
  </FormDialog>;
}

export function EditQuestionDialog(close, { values, onChange, questionIndex }) {
  const form = useForm(onChange, values, null, close);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование вопроса №${questionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.text} name="text" multiline rows={6} validate={validateText} label="Текст вопроса"/>
    </div>
  </FormDialog>;
}

export function ConfirmDeleteQuestionDialog(close, { element, questionIndex }) {
  
  return <ConfirmDialog onClose={close} onConfirm={element.delete} title="Удаление вопроса" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить вопрос №{questionIndex}?
    </DialogContentText>
  </ConfirmDialog>;
}