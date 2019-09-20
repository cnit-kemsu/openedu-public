import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '.';

const DELETE_SECTION_DESIGN = ({ id = 'Int!' }) => `
  deleteCourseDesignSection(id: ${id})
`;

const DELETE_SECTION_DELIVERY = ({ id = 'Int!' }) => `
  deleteCourseDeliverySection(id: ${id})
`;

function onComplete(isDelivery) {
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Раздел был успешно удален.', 'success');
}

export default function ConfirmDeleteSectionDialog(close, { id, item: { name }, isDelivery }) {
  const DELETE_MUTATION = isDelivery ? DELETE_SECTION_DELIVERY : DELETE_SECTION_DESIGN;
  const deleteSection = useMutation(DELETE_MUTATION, { onComplete: () => onComplete(isDelivery) }, { id });
  
  return <ConfirmDialog onClose={close} onConfirm={deleteSection} title="Удаление раздела" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить раздел '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}