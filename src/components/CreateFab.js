import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { SubmitFab } from '@kemsu/core';

export default function CreateFab({ form, children, ...props }) {
  return <SubmitFab form={form} icon={SaveIcon} {...props}>
    {children || 'Сохранить'}
  </SubmitFab>;
}