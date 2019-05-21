import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { SECTIONS } from '../Sections';

const DELETE_SUBSECTION = ({ id = 'Int!' }) => `
  deleteSubsection(id: ${id})
`;
function onComplete() {
  refetch(SECTIONS);
  Notifications.push('Подраздел был успешно удален.', 'success');
}
const deleteSubsection = new Mutation(DELETE_SUBSECTION, { onComplete }).commit;

export default function ConfirmDeleteSectionDialog(close, { id, name }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteSubsection({ id })} title="Удаление подраздела" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить подраздел {name}?
    </DialogContentText>
  </ConfirmDialog>;
}