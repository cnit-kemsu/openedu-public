import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditView(id) { History.push(`/admin/course-delivery-instances/${id}/edit`); }
function routeToStructureView(id) { History.push(`/admin/course-delivery-instances/${id}/structure`); }
function routeToCourseView(id) { History.push(`/course-delivery/${id}/about`); }

export default function CourseReleaseContextMenu(close, { id, item, confirmDeleteDialog }) {

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
    <MenuItem onClick={() => { routeToCourseView(id); }}>
      Просмотр
    </MenuItem>
  </>;
}