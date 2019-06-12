import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE } from '../Sections';

const DELETE_UNIT = ({ id = 'Int!' }) => `
  deleteUnit(id: ${id})
`;
function onComplete() {
  refetch(COURSE);
  Notifications.push('Блок был успешно удален.', 'success');
}
const deleteUnit = new Mutation(DELETE_UNIT, { onComplete }).commit;

export default function ConfirmDeleteUnitDialog(close, { id, item: { name }, subsectionIndex }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteUnit({ id })} title={`Удаление блока в подразделе ${subsectionIndex}`} {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить блок '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}