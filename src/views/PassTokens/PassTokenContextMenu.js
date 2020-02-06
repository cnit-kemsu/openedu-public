import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditPassTokenView(id) { History.push(`/admin/pass-tokens/${id}/edit`); }

export default function PassTokenContextMenu(close, { id, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { routeToEditPassTokenView(id); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}