import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { SECTIONS } from '../Sections';

const DELETE_BLOCK = ({ id = 'Int!' }) => `
  deleteBlock(id: ${id})
`;
function onComplete() {
  refetch(SECTIONS);
  Notifications.push('Блок был успешно удален.', 'success');
}
const deleteBlock = new Mutation(DELETE_BLOCK, { onComplete }).commit;

export default function ConfirmDeleteBlockDialog(close, { id, name }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteBlock({ id })} title="Удаление блока" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить блок {name}?
    </DialogContentText>
  </ConfirmDialog>;
}