import React from 'react';
import { Div as useStyles } from './styles';

function Div({ children }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <div className={classes.div}>
      {children}
    </div>
  </div>;
}

export default React.memo(Div);