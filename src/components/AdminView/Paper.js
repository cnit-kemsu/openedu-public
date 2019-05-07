import React from 'react';
import MuiPaper from '@material-ui/core/Paper';
import { Paper as useStyles } from './styles';

function Paper({ children }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <MuiPaper className={classes.paper}>
      {children}
    </MuiPaper>
  </div>;
}

export default React.memo(Paper);