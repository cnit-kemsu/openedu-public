import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '../..';

const DELETE_UNIT_DESIGN = ({ id = 'Int!' }) => `
  deleteUnitDesign(id: ${id})
`;

const DELETE_UNIT_DELIVERY = ({ id = 'Int!' }) => `
  deleteUnitDelivery(id: ${id})
`;

function onComplete(isDelivery) {
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Блок был успешно удален.', 'success');
}

export default function ConfirmDeleteUnitDialog(close, { id, item: { name }, subsectionIndex, isDelivery }) {
  const DELETE_MUTATION = isDelivery ? DELETE_UNIT_DELIVERY : DELETE_UNIT_DESIGN;
  const deleteUnit = useMutation(DELETE_MUTATION, { onComplete: () => onComplete(isDelivery) }, { id });
  
  return <ConfirmDialog onClose={close} onConfirm={deleteUnit} title={`Удаление блока в подразделе ${subsectionIndex}`} {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить блок '{name}'?
    </DialogContentText>
  </ConfirmDialog>;
}