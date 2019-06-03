import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditUserView(id) { History.push(`/admin/users/${id}/edit`); }

export default function UserContextMenu(close, { id, email, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { routeToEditUserView(id); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, email }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}