import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { TOTAL_COURSE_RELEASES, COURSE_RELEASES } from './CourseReleases';

const DELETE_COURSE_RELEASE = ({ id = 'Int!' }) => `
  deleteCourseRelease(id: ${id})
`;
function onComplete() {
  refetch(TOTAL_COURSE_RELEASES, COURSE_RELEASES);
    Notifications.push('Выпуск был успешно удален.', 'success');
}
const deleteCourse = new Mutation(DELETE_COURSE_RELEASE, { onComplete }).commit;

export default function ConfirmDeleteCourseReleaseDialog(close, { id, item: { name } }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteCourse({ id })} title="Удаление выпуска" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить выпуск {name}?
    </DialogContentText>
  </ConfirmDialog>;
}