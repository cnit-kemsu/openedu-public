import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE } from './';

const DELETE_SECTION = ({ id = 'Int!' }) => `
  deleteSection(id: ${id})
`;
function onComplete() {
  refetch(COURSE);
  Notifications.push('Раздел был успешно удален.', 'success');
}
const deleteSection = new Mutation(DELETE_SECTION, { onComplete }).commit;

export default function ConfirmDeleteSectionDialog(close, { id, item: { name } }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteSection({ id })} title="Удаление раздела" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить раздел '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}