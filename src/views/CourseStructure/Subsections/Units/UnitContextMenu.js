import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToUnitDesignDataView(id) { History.push(`/admin/design-units/${id}`); }
function routeToUnitDeliveryDataView(id) { History.push(`/admin/delivery-units/${id}`); }

export default function UnitContextMenu(close, { id, item, subsectionIndex, editDialog, confirmDeleteDialog, isDelivery }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ id, item, subsectionIndex }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, item, subsectionIndex }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => isDelivery ? routeToUnitDeliveryDataView(id) : routeToUnitDesignDataView(id)}>
      Содержимое
    </MenuItem>
  </>;
}