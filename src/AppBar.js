import React from 'react';
import { History } from '@kemsu/router';
import AuthInfo from './AuthInfo';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AppBar as useStyles } from './styles';

function routeToMainPage() {
  History.push('/');
}

function AppBar() {
  const classes = useStyles();
  return <div className={classes.root}>
    <MuiAppBar position="static" style={{ backgroundColor: '#282828' }}>
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" color="inherit" className={classes.title} onClick={routeToMainPage}>
          Открытое образование
        </Typography>
        <AuthInfo />
      </Toolbar>
    </MuiAppBar>
  </div>;
}

export default React.memo(AppBar);