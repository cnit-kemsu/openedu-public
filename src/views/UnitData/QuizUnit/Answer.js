import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { FormDialog, ConfirmDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import updateSubmitProps from '@components/updateSubmitProps';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { AnswerForm as useStyles } from './styles';

function validateText(value) {
  if (!value) return 'Текст ответа не должен быть пустым';
  return undefined;
}

export function CreateAnswerDialog (close, { push }) {
  const form = useForm(push, null, null, close);

  const classes = useStyles();
  return <FormDialog onClose={close} form={form} title="Новый ответ" {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.text} comp={form} name="text" validate={validateText} label="Текст ответа"/>
    </div>
  </FormDialog>;
}

export function EditAnswerDialog (close, { value, onChange }) {
  const form = useForm(({ text }) => onChange(text), null, () => ({ text: value }), close);

  const classes = useStyles();
  return <FormDialog onClose={close} form={form} title="Редактирование ответа" {...updateSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.text} comp={form} name="text" validate={validateText} label="Текст ответа"/>
    </div>
  </FormDialog>;
}

export function ConfirmDeleteAnswerDialog(close, { element }) {
  
  return <ConfirmDialog onClose={close} onConfirm={element.delete} title="Удаление ответа" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить ответ?
    </DialogContentText>
  </ConfirmDialog>;
}

export function AnswerContextMenu(close, { element, editDialog, confirmDeleteDialog, value, onChange, forceUpdate }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ value, onChange, forceUpdate }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ element }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}