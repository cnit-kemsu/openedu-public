import React from 'react';
import Typography from '@material-ui/core/Typography';

export function BarHeader({ children }) {
  return <Typography variant="h6">{children}</Typography>;
}

export function TextCrumb({ children }) {
  return <Typography color="textPrimary">{children}</Typography>;
}