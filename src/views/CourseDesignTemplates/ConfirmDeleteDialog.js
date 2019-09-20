import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import { TOTAL_COURSE_DESIGN_TEMPLATES, ALL_COURSE_DESIGN_TEMPLATES } from './ListView';

const DELETE_COURSE_DESIGN_TEMPLATE = ({ id = 'Int!' }) => `
  defunctCourseDesignTemplate(id: ${id})
`;
function onComplete() {
  refetch(TOTAL_COURSE_DESIGN_TEMPLATES, ALL_COURSE_DESIGN_TEMPLATES);
    Notifications.push('Шаблон курса был успешно удален.', 'success');
}
const deleteCourseDesignTemplate = new Mutation(DELETE_COURSE_DESIGN_TEMPLATE, { onComplete }).commit;

export default function ConfirmDeleteCourseDialog(close, { id, item: { name } }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteCourseDesignTemplate({ id })} title="Удаление шаблона курса" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить шаблон курса {name}?
    </DialogContentText>
  </ConfirmDialog>;
}