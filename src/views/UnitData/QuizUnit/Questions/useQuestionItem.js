import React from 'react';
import { useMenu, useDialog, MenuModal, DialogModal } from '@kemsu/core';

import { QuestionContextMenu } from './QuestionContextMenu';
import {
  CreateQuestionDialog,
  EditQuestionDialog,
  ConfirmDeleteQuestionDialog
} from './QuestionDialogs';

export function useQuestionItem() {
  const createDialog = useDialog();
  const editDialog = useDialog();
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ editDialog, confirmDeleteDialog });

  const elements = <>
    <MenuModal mgr={menu}>
      {QuestionContextMenu}
    </MenuModal>

    <DialogModal mgr={createDialog}>
      {CreateQuestionDialog}
    </DialogModal>

    <DialogModal mgr={editDialog}>
      {EditQuestionDialog}
    </DialogModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteQuestionDialog}
    </DialogModal>
  </>;

  return [
    createDialog,
    menu,
    elements
  ];
}