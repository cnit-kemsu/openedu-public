import React from 'react';
import { LeftBar as useStyles } from './styles';

function LeftBar({ children }) {

  const classes = useStyles();
  return <span className={classes.root}>
    {children}
  </span>;
}

export default React.memo(LeftBar);