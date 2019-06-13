import React from 'react';
import { useMenu, useDialog, MenuModal, DialogModal } from '@kemsu/core';

import { AnswerContextMenu } from './AnswerContextMenu';
import {
  CreateAnswerDialog,
  EditAnswerDialog,
  ConfirmDeleteAnswerDialog
} from './AnswerDialogs';

export function useAnswerItem() {
  const createDialog = useDialog();
  const editDialog = useDialog();
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ editDialog, confirmDeleteDialog });

  const elements = <>
    <MenuModal mgr={menu}>
      {AnswerContextMenu}
    </MenuModal>

    <DialogModal mgr={createDialog}>
      {CreateAnswerDialog}
    </DialogModal>

    <DialogModal mgr={editDialog}>
      {EditAnswerDialog}
    </DialogModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteAnswerDialog}
    </DialogModal>
  </>;

  return [
    createDialog,
    menu,
    elements
  ];
}