import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditCourseReleaseView(id) { History.push(`/admin/releases/${id}/edit`); }
function routeToCourseReleaseStructureView(id) { History.push(`/admin/releases/${id}/structure`); }

export default function CourseReleaseContextMenu(close, { id, item, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { routeToEditCourseReleaseView(id); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, item }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { routeToCourseReleaseStructureView(id); }}>
      Структура
    </MenuItem>
  </>;
}