import React from 'react';
import { History } from '@kemsu/router';
import AccountInfo from './AccountInfo';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

function routeToMainView() {
  History.push('/');
}

function AppBar() {
  const classes = useStyles();
  return <div>
    <MuiAppBar position="static" className={classes.root}>
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit">
          <MenuIcon />
        </IconButton> */}
        {/* <Typography variant="h6" color="inherit" className={classes.title} onClick={routeToMainPage}>
          Открытое образование
        </Typography> */}
        <AccountInfo />
      </Toolbar>
    </MuiAppBar>
  </div>;
}

export default React.memo(AppBar);