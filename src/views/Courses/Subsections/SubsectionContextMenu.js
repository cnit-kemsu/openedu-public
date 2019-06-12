import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

export default function SubsectionContextMenu(close, { id, item, sectionIndex, editDialog, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ id, item, sectionIndex }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, item, sectionIndex }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}