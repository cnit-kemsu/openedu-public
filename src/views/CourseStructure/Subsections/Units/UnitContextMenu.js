import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToUnitDataView(id) { History.push(`/admin/units/${id}`); }
function routeToUnitReleaseDataView(id) { History.push(`/admin/unit_releases/${id}`); }

export default function UnitContextMenu(close, { id, item, subsectionIndex, editDialog, confirmDeleteDialog, release }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ id, item, subsectionIndex }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, item, subsectionIndex }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => release ? routeToUnitReleaseDataView(id) : routeToUnitDataView(id)}>
      Содержимое
    </MenuItem>
  </>;
}