import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE, COURSE_RELEASE } from '.';

const DELETE_SECTION = ({ id = 'Int!' }) => `
  deleteSection(id: ${id})
`;

const DELETE_SECTION_RELEASE = ({ id = 'Int!' }) => `
  deleteSectionRelease(id: ${id})
`;

function onComplete(release) {
  refetch(release ? COURSE_RELEASE : COURSE);
  Notifications.push('Раздел был успешно удален.', 'success');
}

export default function ConfirmDeleteSectionDialog(close, { id, item: { name }, release }) {
  const DELETE_MUTATION = release ? DELETE_SECTION_RELEASE : DELETE_SECTION;
  const deleteSection = useMutation(DELETE_MUTATION, { onComplete: () => onComplete(release) }, { id });
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteSection({ id })} title="Удаление раздела" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить раздел '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}