import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditView(id) { History.push(`/admin/course-design-templates/${id}/edit`); }
function routeToStructureView(id) { History.push(`/admin/course-design-templates/${id}/structure`); }
function routeToCreateCourseDeliveryInstanceView(id) { History.push(`/admin/course-delivery-instances/${id}/create`); }

export default function CourseDesignTemplateContextMenu(close, { id, item, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { routeToEditView(id); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, item }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { routeToStructureView(id); }}>
      Структура
    </MenuItem>
    <MenuItem onClick={() => { routeToCreateCourseDeliveryInstanceView(id); }}>
      Создать выпуск
    </MenuItem>
  </>;
}