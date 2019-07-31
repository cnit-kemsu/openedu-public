import React from 'react';
import { useMenu, useDialog, MenuModal, DialogModal } from '@kemsu/core';

import ContextMenu from './SectionContextMenu';
import CreateDialog from './CreateSectionDialog';
import EditDialog from './EditSectionDialog';
import ConfirmDeleteDialog from './ConfirmDeleteSectionDialog';

export function useSectionItem(_courseId, isDelivery) {
  const createDialog = useDialog({ _courseId, isDelivery });
  const editDialog = useDialog({ isDelivery });
  const confirmDeleteDialog = useDialog({ isDelivery });
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