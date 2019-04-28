import React from 'react';
import Drawer from './Drawer';
import Routing from './Routing';
import useStyles from './styles';

function AdminLayout() {
  
  const classes = useStyles();
  return <>
    <Drawer />
    <div className={classes.content}>
      <Routing />
    </div>
  </>;
}

export default React.memo(AdminLayout);