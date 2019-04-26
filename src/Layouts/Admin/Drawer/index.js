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
import AccountIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Logo from '../../../Logo';
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
    <MenuItem onClick={() => { routeToMainView(); }}>На главную страницу</MenuItem>
    <MenuItem onClick={() => { deleteUserInfo(); }}>Выйти из аккаунта</MenuItem>
  </>;
}

function AdminDrawer() {
  useUserInfo();
  const userMenu = useMenu();

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