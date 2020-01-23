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

    <div style={{
      //backgroundColor: 'rgb(92, 113, 232)',
      backgroundColor: 'white',
      paddingLeft: '16px',
      border: '1px solid #222222'
    }}>
      <Logo className={classes.logo} style={{ height: '64px', paddingTop: '4px', paddingBottom: '2px' }} />
    </div>
    {/* <Divider className={classes.divider} /> */}

    <AccountInfo />
    <Divider className={classes.divider} />
    
    <Navigation />
      
  </MuiDrawer>;
}

export default React.memo(Drawer);