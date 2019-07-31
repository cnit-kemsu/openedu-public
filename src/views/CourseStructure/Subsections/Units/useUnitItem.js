import React from 'react';
import { useMenu, useDialog, MenuModal, DialogModal } from '@kemsu/core';
import ContextMenu from './UnitContextMenu';
import CreateDialog from './CreateUnitDialog';
import EditDialog from './EditUnitDialog';
import ConfirmDeleteDialog from './ConfirmDeleteUnitDialog';

export function useUnitItem(isDelivery) {
  const createDialog = useDialog({ isDelivery });
  const editDialog = useDialog({ isDelivery });
  const confirmDeleteDialog = useDialog({ isDelivery });
  const menu = useMenu({ editDialog, confirmDeleteDialog, isDelivery });

  const elements = <>
    <MenuModal mgr={menu}>
      {ContextMenu}
    </MenuModal>

    <DialogModal mgr={createDialog}>
      {CreateDialog}
    </DialogModal>

    <DialogModal mgr={editDialog}>
      {EditDialog}
    </DialogModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteDialog}
    </DialogModal>
  </>;

  return [
    createDialog,
    menu,
    elements
  ];
}