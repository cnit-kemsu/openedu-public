import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

export function AnswerContextMenu(close, { element, values, onChange, questionIndex, answerIndex, editDialog, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { close(); editDialog.open({ values, onChange, questionIndex, answerIndex }); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ element, questionIndex, answerIndex }); }}>
      <DeleteMenuItem />
    </MenuItem>
  </>;
}