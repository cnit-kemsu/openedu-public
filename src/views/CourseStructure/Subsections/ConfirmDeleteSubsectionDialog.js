import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE, COURSE_RELEASE } from '..';

const DELETE_SUBSECTION = ({ id = 'Int!' }) => `
  deleteSubsection(id: ${id})
`;

const DELETE_SUBSECTION_RELEASE = ({ id = 'Int!' }) => `
  deleteSubsectionRelease(id: ${id})
`;

function onComplete(release) {
  refetch(release ? COURSE_RELEASE : COURSE);
  Notifications.push('Подраздел был успешно удален.', 'success');
}

export default function ConfirmDeleteSubsectionDialog(close, { id, item: { name }, sectionIndex, release }) {
  const DELETE_MUTATION = release ? DELETE_SUBSECTION_RELEASE : DELETE_SUBSECTION;
  const deleteSubsection = useMutation(DELETE_MUTATION, { onComplete: () => onComplete(release) }, { id });
  
  return <ConfirmDialog onClose={close} onConfirm={deleteSubsection} title={`Удаление подраздела в разделе ${sectionIndex}`} {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить подраздел '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}