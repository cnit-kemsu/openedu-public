import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { History } from '@kemsu/router';
import Logo from '@components/Logo';
import AuthStatus from './AuthStatus';
import useStyles from './styles';

function routeToMainView() {
  History.push('/');
}

function AppBar() {
  const classes = useStyles();
  return <div>
    <MuiAppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Logo className={classes.logo} classes={{ logo: classes.logo_logo, title: classes.logo_title }} onClick={routeToMainView} />
        <AuthStatus />
      </Toolbar>
    </MuiAppBar>
  </div>;
}

export default React.memo(AppBar);