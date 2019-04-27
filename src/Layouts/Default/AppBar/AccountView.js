import React from 'react';
import { History } from '@kemsu/router';
import { useMenu, MenuModal } from '@kemsu/core';
import { UserInfo } from '../../../classes/UserInfo';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AccountView as useStyles } from './styles';

function routeToAdminView() {
  History.push('/admin/users');
}
function deleteUserInfo() {
  UserInfo.clear();
  History.push('/');
}
function UserMenu(close) {
  return <>
    <MenuItem onClick={routeToAdminView}>К администрированию</MenuItem>
    <MenuItem onClick={() => { close(); deleteUserInfo(); }}>Выйти из аккаунта</MenuItem>
  </>;
}

function AccountView() {
  const userMenu = useMenu();

  const classes = useStyles();
  return <div className={classes.root}>
    <AccountCircle className={classes.icon} />
    <Typography>{UserInfo.email}</Typography>
    <IconButton className={classes.menuButton} onClick={userMenu.open}>
      <ArrowDropDown />
    </IconButton>
    <MenuModal mgr={userMenu}>
      {UserMenu}
    </MenuModal>
  </div>;
}

export default React.memo(AccountView);