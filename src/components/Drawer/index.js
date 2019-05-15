import React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Logo from '@components/Logo';
import AccountInfo from './AccountInfo';
import Navigation from './Navigation';
import useStyles from './styles';
export { drawerWidth } from './styles';

function Drawer() {

  const classes = useStyles();
  return <MuiDrawer variant="permanent" className={classes.root} classes={{ paper: classes.paper }}>

    <Logo className={classes.logo} />
    <Divider className={classes.divider} />

    <AccountInfo />
    <Divider className={classes.divider} />
    
    <Navigation />
      
  </MuiDrawer>;
}

export default React.memo(Drawer);