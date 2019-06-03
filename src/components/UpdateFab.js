import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { SubmitFab } from '@kemsu/core';

export default function UpdateFab({ comp, loading, errors, children, ...props }) {
  return <SubmitFab disableIfNotDirty={true} comp={comp} icon={SaveIcon}
  disabled={loading || Boolean(errors)} {...props}>
    {children || 'Сохранить изменения'}
  </SubmitFab>;
}