import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';
import { useForm, useField } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { FormDialog, ConfirmDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import updateSubmitProps from '@components/updateSubmitProps';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { QuestionForm as useStyles } from './styles';

function validateText(value) {
  if (!value) return 'Текст вопроса не должен быть пустым';
  return undefined;
}

export function CreateQuestionDialog (close, { push }) {
  const form = useForm(push, null, null, close);

  const classes = useStyles();
  return <FormDialog onClose={close} form={form} title="Новый вопрос" {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.text} comp={form} name="text" validate={validateText} label="Текст вопроса"/>
    </div>
  </FormDialog>;
}

export function EditQuestionDialog (close, { value, onChange, forceUpdate }) {
  const form = useForm(({ text }) => { onChange(text); forceUpdate(); }, null, () => ({ text: value }), close);

  const classes = useStyles();
  return <FormDialog onClose={close} form={form} title="Редактирование вопроса" {...updateSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.text} comp={form} name="text" validate={validateText} label="Текст вопроса"/>
    </div>
  </FormDialog>;
}

export function ConfirmDeleteQuestionDialog(close, { element }) {
  
  return <ConfirmDialog onClose={close} onConfirm={element.delete} title="Удаление вопроса" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить вопрос?
    </DialogContentText>
  </ConfirmDialog>;
}

export function QuestionContextMenu(close, { element, editDialog, confirmDeleteDialog, value, onChange, forceUpdate }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ value, onChange, forceUpdate }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ element }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}