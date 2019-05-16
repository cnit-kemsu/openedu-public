import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { SubmitFab } from '@kemsu/core';

export default function UpdateFab({ form, loading, errors, children, ...props }) {
  return <SubmitFab disableIfNotDirty={true} form={form} icon={SaveIcon}
  disabled={loading || Boolean(errors)} {...props}>
    {children || 'Сохранить изменения'}
  </SubmitFab>;
}