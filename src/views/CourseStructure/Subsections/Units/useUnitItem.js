import React from 'react';
import { useMenu, useDialog, MenuModal, DialogModal } from '@kemsu/core';
import ContextMenu from './UnitContextMenu';
import CreateDialog from './CreateUnitDialog';
import EditDialog from './EditUnitDialog';
import ConfirmDeleteDialog from './ConfirmDeleteUnitDialog';

export function useUnitItem(release) {
  const createDialog = useDialog({ release });
  const editDialog = useDialog({ release });
  const confirmDeleteDialog = useDialog({ release });
  const menu = useMenu({ editDialog, confirmDeleteDialog, release });

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