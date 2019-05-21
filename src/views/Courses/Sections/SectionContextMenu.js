import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

export default function SectionContextMenu(close, { id, name, summary, editDialog, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ id, name, summary }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, name }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}