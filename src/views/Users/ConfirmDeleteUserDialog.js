import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { TOTAL_USERS, USERS } from './Users';

const DELETE_USER = ({ id = 'Int!' }) => `
  deleteUser(id: ${id})
`;
function onComplete() {
  refetch(TOTAL_USERS, USERS);
    Notifications.push('Пользователь был успешно удален.', 'success');
}
const deleteUser = new Mutation(DELETE_USER, { onComplete }).commit;

export default function ConfirmDeleteUserDialog(close, { id, email }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteUser({ id })} title="Удаление пользователя" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить пользователя {email}?
    </DialogContentText>
  </ConfirmDialog>;
}