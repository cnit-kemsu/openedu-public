import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

export function QuestionContextMenu(close, { element, values, onChange, editDialog, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ values, onChange }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ element }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}