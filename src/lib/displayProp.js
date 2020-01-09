import React from 'react';
import { Typography } from "@material-ui/core";

export default function displayProp(value, typographyProps) {
  return typeof value === 'string'
    ? <Typography {...typographyProps}>{value}</Typography>
    : value;
}