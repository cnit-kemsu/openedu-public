import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToUnitDataView(id) { History.push(`/admin/units/${id}`); }

export default function UnitContextMenu(close, { id, item, subsectionIndex, editDialog, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ id, item, subsectionIndex }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, item, subsectionIndex }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => routeToUnitDataView(id)}>
      Содержимое
    </MenuItem>
  </>;
}