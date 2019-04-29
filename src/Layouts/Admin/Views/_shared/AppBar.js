import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar as useStyles } from './styles';

function AppBar({ children }) {

  const classes = useStyles();
  return <div>
    <MuiAppBar position="static" className={classes.root}>
      <Toolbar>
        {children}
      </Toolbar>
    </MuiAppBar>
  </div>;
}

export default React.memo(AppBar);