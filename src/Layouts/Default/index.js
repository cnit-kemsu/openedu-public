import React from 'react';
import AppBar from './AppBar';
import Routing from './Routing';
import useStyles from './styles';

function DefaultLayout() {
  
  const classes = useStyles();
  return <div className={classes.content}>
    <AppBar />
    <Routing />
  </div >;
}

export default React.memo(DefaultLayout);