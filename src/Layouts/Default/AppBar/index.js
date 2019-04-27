import React from 'react';
import { History } from '@kemsu/router';
import MuiAppBar from '@material-ui/core/AppBar';
import AccountInfo from './AccountInfo';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import School from '@material-ui/icons/School';
import useStyles from './styles';

function routeToMainView() {
  History.push('/');
}

function AppBar() {
  const classes = useStyles();
  return <div>
    <MuiAppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.sitename} onClick={routeToMainView}>
          <School className={classes.logo} />
          <Typography variant="h6" color="inherit" className={classes.title}>
            Открытое образование
          </Typography>
        </div>
        <AccountInfo />
      </Toolbar>
    </MuiAppBar>
  </div>;
}

export default React.memo(AppBar);