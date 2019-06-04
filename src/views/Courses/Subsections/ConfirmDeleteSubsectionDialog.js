import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE } from '../Sections';

const DELETE_SUBSECTION = ({ id = 'Int!' }) => `
  deleteSubsection(id: ${id})
`;
function onComplete() {
  refetch(COURSE);
  Notifications.push('Подраздел был успешно удален.', 'success');
}
const deleteSubsection = new Mutation(DELETE_SUBSECTION, { onComplete }).commit;

export default function ConfirmDeleteSubsectionDialog(close, { id, name, sectionIndex }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteSubsection({ id })} title={`Удаление подраздела в разделе ${sectionIndex}`} {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить подраздел '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}