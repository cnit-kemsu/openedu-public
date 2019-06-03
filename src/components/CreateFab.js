import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { SubmitFab } from '@kemsu/core';

export default function CreateFab({ comp, children, ...props }) {
  return <SubmitFab comp={comp} icon={SaveIcon} {...props}>
    {children || 'Сохранить'}
  </SubmitFab>;
}