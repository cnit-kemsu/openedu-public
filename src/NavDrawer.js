import React from 'react';
import { UserInfo } from './classes/UserInfo';
import { useUserInfo } from './hooks/useUserInfo';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Logo from './Logo';
import { Drawer as useStyles } from './styles';

function NavDrawer() {
  useUserInfo();

  const classes = useStyles();
  return <Drawer variant="permanent" className={classes.root} classes={{ paper: classes.paper }}>

    <div className={classes.title}>
      <Logo className={classes.logo} />
      <div>
        <Typography variant="h6" color="inherit" className={classes.titleFragment}>
          Открытое
        </Typography>
        <Typography variant="h6" color="inherit" className={classes.titleFragment}>
          образование
        </Typography>
      </div>
    </div>

    <Divider className={classes.divider} />

    <div className={classes.accountInfo}>
      <AccountIcon className={classes.userIcon} />
      <div className={classes.drawer_userEmail}>
        <Typography>{UserInfo.email}</Typography>
        {/* TODO: place icon */}
      </div>
    </div>

    <Divider className={classes.divider} />
    
    <List>
      <ListItem button>
        <ListItemText primary="Пользователи" />
      </ListItem>
    </List>
      
  </Drawer>;
}

export default React.memo(NavDrawer);