import React from 'react';
import { ResetButton } from '@kemsu/core';

export default function UpdateFab({ form, loading, errors, children, ...props }) {
  return <ResetButton disabled={loading || Boolean(errors)} form={form} {...props}>{children || 'Очистить'}</ResetButton>;
}