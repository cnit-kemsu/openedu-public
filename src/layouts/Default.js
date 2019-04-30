import React from 'react';
import { useRoutes } from '@kemsu/router';
import pageNotFound from '@components/PageNotFound';
import AppBar from '@components/AppBar';
import MainView from '@views/Main';
import AccountView from '@views/Account';
import { DefaultLayout as useStyles } from './styles';

const routes = [
  [/^\/$/, props => <MainView {...props} />],
  [/\/account\/(?<variant>signin|signup|verify)/, props => <AccountView {...props} />]
];

function DefaultLayout() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <AppBar />
    {useRoutes(routes) || pageNotFound}
  </div >;
}

export default React.memo(DefaultLayout);