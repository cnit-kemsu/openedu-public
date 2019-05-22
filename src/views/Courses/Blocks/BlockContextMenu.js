import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditBlockContentView(courseId, sectionId, subsectionId, blockId) { History.push(`/admin/courses/${courseId}/sections/${sectionId}/subsections/${subsectionId}/blocks/${blockId}`); }

export default function BlockContextMenu(close, { id, name, summary, editDialog, confirmDeleteDialog, sectionId, subsectionId, courseId }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ id, name, summary }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, name }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => routeToEditBlockContentView(courseId, sectionId, subsectionId, id)}>
      Содержимое
    </MenuItem>
  </>;
}