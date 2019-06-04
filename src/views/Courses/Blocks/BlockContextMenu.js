import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToBlockDataView(blockId) { History.push(`/admin/blocks/${blockId}`); }

export default function BlockContextMenu(close, { id, name, summary, subsectionIndex, editDialog, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ id, name, summary, subsectionIndex }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, name, subsectionIndex }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => routeToBlockDataView(id)}>
      Содержимое
    </MenuItem>
  </>;
}