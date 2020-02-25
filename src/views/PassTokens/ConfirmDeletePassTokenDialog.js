import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { TOTAL_PASSTOKENS, PASSTOKENS } from './PassTokens';

const DELETE_PASSTOKEN = ({ id = 'Int!' }) => `
  deletePassToken(id: ${id})
`;
function onComplete() {
  refetch(TOTAL_PASSTOKENS, PASSTOKENS);
  Notifications.push('Пропуск был успешно удален.', 'success');
}
const deleteUser = new Mutation(DELETE_PASSTOKEN, { onComplete }).commit;

export default function ConfirmDeleteUserDialog(close, { id }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteUser({ id })} title="Удаление пропуска" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить пропуск?
    </DialogContentText>
  </ConfirmDialog>;
}