import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation } from '@kemsu/graphql-client';
import { ConfirmDialog } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';

const deleteUserMutation = `
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;
function onComplete() {
  //
}

export default function ConfirmDeleteUserDialog(close, { id, email, refreshList }) {

  const deleteUser = useMutation(deleteUserMutation, { onComplete: () => { close(); refreshList(); } });

  return <ConfirmDialog onClose={close} onConfirm={() => deleteUser({ id })} title="Удаление пользователя" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить пользователя {email}?
    </DialogContentText>
  </ConfirmDialog>;
}