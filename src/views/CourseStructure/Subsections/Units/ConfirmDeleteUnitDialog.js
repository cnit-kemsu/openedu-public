import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE, COURSE_RELEASE } from '../..';

const DELETE_UNIT = ({ id = 'Int!' }) => `
  deleteUnit(id: ${id})
`;

const DELETE_UNIT_RELEASE = ({ id = 'Int!' }) => `
  deleteUnitRelease(id: ${id})
`;

function onComplete(release) {
  refetch(release ? COURSE_RELEASE : COURSE);
  Notifications.push('Блок был успешно удален.', 'success');
}

export default function ConfirmDeleteUnitDialog(close, { id, item: { name }, subsectionIndex, release }) {
  const DELETE_MUTATION = release ? DELETE_UNIT_RELEASE : DELETE_UNIT;
  const deleteUnit = useMutation(DELETE_MUTATION, { onComplete: () => onComplete(release) }, { id });
  
  return <ConfirmDialog onClose={close} onConfirm={deleteUnit} title={`Удаление блока в подразделе ${subsectionIndex}`} {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить блок '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}