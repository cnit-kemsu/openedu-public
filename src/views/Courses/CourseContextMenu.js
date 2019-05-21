import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditCourseView(id) { History.push(`/admin/courses/edit/${id}`); }
function routeToSectionsView(id) { History.push(`/admin/courses/${id}/content`); }

export default function CourseContextMenu(close, { id, name, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { routeToEditCourseView(id); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, name }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { routeToSectionsView(id); }}>
      Структура
    </MenuItem>
  </>;
}