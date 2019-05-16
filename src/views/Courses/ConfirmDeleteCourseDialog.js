import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { TOTAL_COURSES, COURSES } from './Courses';

const DELETE_COURSE = ({ id = 'Int!' }) => `
  deleteCourse(id: ${id})
`;
function onComplete() {
  refetch(TOTAL_COURSES, COURSES);
    Notifications.push('Курс был успешно удален.', 'success');
}
const deleteCourse = new Mutation(DELETE_COURSE, { onComplete }).commit;

export default function ConfirmDeleteCourseDialog(close, { id, name }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteCourse({ id })} title="Удаление курса" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить курс {name}?
    </DialogContentText>
  </ConfirmDialog>;
}