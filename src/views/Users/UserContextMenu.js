import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

export default function UserContextMenu(close, { id, email, confirmDeleteDialog, refreshList }) {

  return <>
    <MenuItem onClick={() => { close(); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, email, refreshList }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}