import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditCourseView(id) { History.push(`/admin/courses/edit/${id}`); }

export default function CourseContextMenu(close, { id, name, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { close(); routeToEditCourseView(id); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, name }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}