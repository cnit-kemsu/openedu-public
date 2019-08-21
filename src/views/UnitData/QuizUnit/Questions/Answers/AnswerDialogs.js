import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useForm } from '@kemsu/form';
import { TextField, Editor } from '@kemsu/inputs';
import { FormDialog, ConfirmDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import updateSubmitProps from '@components/updateSubmitProps';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { AnswerForm as useStyles } from './styles';

function validateText(value) {
  if (!value) return 'Содержание ответа не должен быть пустым';
}

export function CreateAnswerDialog(close, { push, questionIndex }) {
  const form = useForm(push, null, null, { onSubmitted: close });

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Новый ответ к вопросу №${questionIndex}`} {...createSubmitProps}>
    <div className={classes.root}>
      {/* <TextField className={classes.text} name="text" multiline rows={4} validate={validateText} label="Текст ответа"/> */}
      <Editor name="content" label="Содержание"/>
    </div>
  </FormDialog>;
}

export function EditAnswerDialog(close, { values, onChange, questionIndex, answerIndex }) {
  const form = useForm((newValues) => onChange({ ...values, ...newValues }), values, null, { onSubmitted: close });

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование ответа №${answerIndex} к вопросу №${questionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
      {/* <TextField className={classes.text} name="text" multiline rows={4} validate={validateText} label="Текст ответа"/> */}
      <Editor name="content" label="Содержание"/>
    </div>
  </FormDialog>;
}

export function ConfirmDeleteAnswerDialog(close, { element, questionIndex, answerIndex }) {
  
  return <ConfirmDialog onClose={close} onConfirm={element.delete} title={`Удаление ответа №${answerIndex} к вопросу №${questionIndex}`} {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить выбранный ответ?
    </DialogContentText>
  </ConfirmDialog>;
}