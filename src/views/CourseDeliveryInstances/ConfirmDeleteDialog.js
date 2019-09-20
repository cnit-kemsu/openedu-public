import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { TOTAL_COURSE_DELIVERY_INSTANCES, ALL_COURSE_DELIVERY_INSTANCES } from './ListView';

const DELETE_COURSE_DELIVERY_INSTANCE = ({ id = 'Int!' }) => `
  defunctCourseDeliveryInstance(id: ${id})
`;
function onComplete() {
  refetch(TOTAL_COURSE_DELIVERY_INSTANCES, ALL_COURSE_DELIVERY_INSTANCES);
    Notifications.push('Экземпляр курса был успешно удален.', 'success');
}
const deleteCourse = new Mutation(DELETE_COURSE_DELIVERY_INSTANCE, { onComplete }).commit;

export default function ConfirmDeleteCourseDeliveryInstanceDialog(close, { id, item: { name } }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteCourse({ id })} title="Удаление экземпляра курса" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить выпуск {name}?
    </DialogContentText>
  </ConfirmDialog>;
}