import React from 'react';
import { useRoutes } from '@kemsu/router';
import Drawer from './Drawer';
import UsersView from './Views/Users';
import useStyles from './styles';
import pageNotFound from '../../PageNotFound';

const routes = [
  [/.+\/users/, UsersView]
];

function AdminLayout() {
  
  const classes = useStyles();
  return <>
    <Drawer />
    <div className={classes.content}>
      {useRoutes(routes) || pageNotFound}
    </div>
  </>;
}

export default React.memo(AdminLayout);