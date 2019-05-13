import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { TOTAL_USERS, USERS } from './Users';

const DELETE_USER = `
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

export default function ConfirmDeleteUserDialog(close, { id, email }) {
  const deleteUser = useMutation(DELETE_USER, { onComplete: () => { close(); refetch(TOTAL_USERS, USERS); } });

  return <ConfirmDialog onClose={close} onConfirm={() => deleteUser({ id })} title="Удаление пользователя" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить пользователя {email}?
    </DialogContentText>
  </ConfirmDialog>;
}