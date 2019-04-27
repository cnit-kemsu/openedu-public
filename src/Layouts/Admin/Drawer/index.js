import React from 'react';
import { History } from '@kemsu/router';
import { useMenu, MenuModal } from '@kemsu/core';
import { UserInfo } from '../../../classes/UserInfo';
import { useUserInfo } from '../../../hooks/useUserInfo';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import School from '@material-ui/icons/School';
import Navigation from './Navigation';
import useStyles from './styles';

function routeToMainView() {
  History.push('/');
}
function deleteUserInfo() {
  UserInfo.clear();
  History.push('/');
}
function UserMenu() {
  return <>
    <MenuItem onClick={() => { routeToMainView(); }}>К обычному просмотру</MenuItem>
    <MenuItem onClick={() => { deleteUserInfo(); }}>Выйти из аккаунта</MenuItem>
  </>;
}

function AdminDrawer() {
  useUserInfo();
  const userMenu = useMenu();

  const classes = useStyles();
  return <Drawer variant="permanent" className={classes.root} classes={{ paper: classes.paper }}>

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
        <IconButton className={classes.menuButton} onClick={userMenu.open}>
          <ArrowDropDown />
        </IconButton>
      </div>
    </div>

    <MenuModal mgr={userMenu}>
      {UserMenu}
    </MenuModal>

    <Divider className={classes.divider} />
    
    <Navigation />
      
  </Drawer>;
}

export default React.memo(AdminDrawer);