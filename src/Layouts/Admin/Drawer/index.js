import React from 'react';
import { History } from '@kemsu/router';
import { useMenu, MenuModal } from '@kemsu/core';
import { UserInfo } from '../../../classes/UserInfo';
import Navigation from './Navigation';
import MuiDrawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import School from '@material-ui/icons/School';
import useStyles from './styles';

function routeToMainView() {
  History.push('/');
}
function deleteUserInfo() {
  UserInfo.clear();
  History.push('/');
}
function UserActionMenu() {
  return <>
    <MenuItem onClick={routeToMainView}>К обычному просмотру</MenuItem>
    <MenuItem onClick={deleteUserInfo}>Выйти из аккаунта</MenuItem>
  </>;
}

function Drawer() {
  const userActionMenu = useMenu();

  const classes = useStyles();
  return <MuiDrawer variant="permanent" className={classes.root} classes={{ paper: classes.paper }}>

    <div className={classes.sitename}>
      <School className={classes.logo} />
      <Typography variant="h6" color="inherit">
        Открытое образование
      </Typography>
    </div>

    <Divider className={classes.divider} />

    <div className={classes.accountInfo}>
      <AccountCircle className={classes.userIcon} />
      <div className={classes.userEmail}>
        <Typography>{UserInfo.email}</Typography>
        <IconButton className={classes.menuButton} onClick={userActionMenu.open}>
          <ArrowDropDown />
        </IconButton>
      </div>
    </div>

    <MenuModal mgr={userActionMenu}>
      {UserActionMenu}
    </MenuModal>

    <Divider className={classes.divider} />
    
    <Navigation />
      
  </MuiDrawer>;
}

export default React.memo(Drawer);