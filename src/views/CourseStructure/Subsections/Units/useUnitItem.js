import React from 'react';
import { useMenu, useDialog, MenuModal, DialogModal } from '@kemsu/core';
import ContextMenu from './UnitContextMenu';
import CreateDialog from './CreateUnitDialog';
import EditDialog from './EditUnitDialog';
import ConfirmDeleteDialog from './ConfirmDeleteUnitDialog';

export function useUnitItem() {
  const createDialog = useDialog();
  const editDialog = useDialog();
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ editDialog, confirmDeleteDialog });

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