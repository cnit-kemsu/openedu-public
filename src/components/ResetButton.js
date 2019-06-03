import React from 'react';
import { ResetButton } from '@kemsu/core';

export default function UpdateFab({ comp, loading, errors, children, ...props }) {
  return <ResetButton disabled={loading || Boolean(errors)} comp={comp} {...props}>{children || 'Очистить'}</ResetButton>;
}