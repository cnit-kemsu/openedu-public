import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '..';

const DELETE_SUBSECTION_DESIGN = ({ id = 'Int!' }) => `
  deleteSubsectionDesign(id: ${id})
`;

const DELETE_SUBSECTION_DELIVERY = ({ id = 'Int!' }) => `
  deleteSubsectionDelivery(id: ${id})
`;

function onComplete(isDelivery) {
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Подраздел был успешно удален.', 'success');
}

export default function ConfirmDeleteSubsectionDialog(close, { id, item: { name }, sectionIndex, isDelivery }) {
  const DELETE_MUTATION = isDelivery ? DELETE_SUBSECTION_DELIVERY : DELETE_SUBSECTION_DESIGN;
  const deleteSubsection = useMutation(DELETE_MUTATION, { onComplete: () => onComplete(isDelivery) }, { id });
  
  return <ConfirmDialog onClose={close} onConfirm={deleteSubsection} title={`Удаление подраздела в разделе ${sectionIndex}`} {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить подраздел '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}