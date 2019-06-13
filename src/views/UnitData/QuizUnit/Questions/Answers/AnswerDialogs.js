import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { FormDialog, ConfirmDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import updateSubmitProps from '@components/updateSubmitProps';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { AnswerForm as useStyles } from './styles';

function validateText(value) {
  if (!value) return 'Текст ответа не должен быть пустым';
}

export function CreateAnswerDialog(close, { push }) {
  const form = useForm(push, null, null, close);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Новый ответ" {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.text} name="text" validate={validateText} label="Текст ответа"/>
    </div>
  </FormDialog>;
}

export function EditAnswerDialog(close, { values, onChange }) {
  const form = useForm(onChange, values, null, close);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Редактирование ответа" {...updateSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.text} name="text" validate={validateText} label="Текст ответа"/>
    </div>
  </FormDialog>;
}

export function ConfirmDeleteAnswerDialog(close, { element }) {
  
  return <ConfirmDialog onClose={close} onConfirm={element.delete} title="Удаление ответа" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить выбранный ответ?
    </DialogContentText>
  </ConfirmDialog>;
}