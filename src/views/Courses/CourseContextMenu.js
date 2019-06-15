import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditCourseView(id) { History.push(`/admin/courses/${id}/edit`); }
function routeToCourseStructureView(id) { History.push(`/admin/courses/${id}/structure`); }
function routeToCreateCourseReleaseView(id) { History.push(`/admin/releases/${id}/create`); }

export default function CourseContextMenu(close, { id, item, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { routeToEditCourseView(id); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, item }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { routeToCourseStructureView(id); }}>
      Структура
    </MenuItem>
    <MenuItem onClick={() => { routeToCreateCourseReleaseView(id); }}>
      Создать выпуск
    </MenuItem>
  </>;
}