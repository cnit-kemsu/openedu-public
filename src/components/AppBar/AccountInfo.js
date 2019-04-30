import React from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { History } from '@kemsu/router';
import { useMenu, MenuModal } from '@kemsu/core';
import { UserInfo } from '@lib/UserInfo';
import { AccountInfo as useStyles } from './styles';

function routeToAdminView() { History.push('/admin'); }
function signout() { UserInfo.clear(); History.push('/'); }

function Menu(close) {
  return <>
    <MenuItem onClick={routeToAdminView}>Администрирование</MenuItem>
    <MenuItem onClick={() => { close(); signout(); }}>Выйти из аккаунта</MenuItem>
  </>;
}

function AccountInfo() {
  const menu = useMenu();

  const classes = useStyles();
  return <div className={classes.root}>
    <AccountCircle className={classes.icon} />
    <Typography>{UserInfo.email}</Typography>
    <IconButton className={classes.menuButton} onClick={menu.open}>
      <ArrowDropDown />
    </IconButton>
    <MenuModal mgr={menu}>
      {Menu}
    </MenuModal>
  </div>;
}

export default React.memo(AccountInfo);