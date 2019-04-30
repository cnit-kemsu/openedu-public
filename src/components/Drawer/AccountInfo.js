import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { History } from '@kemsu/router';
import { useMenu, MenuModal } from '@kemsu/core';
import { UserInfo } from '@lib/UserInfo';
import { AccountInfo as useStyles } from './styles';

function routeToDefaultView() { History.push('/'); }
function signout() { UserInfo.clear(); History.push('/'); }
function Menu() {
  return <>
    <MenuItem onClick={routeToDefaultView}>Обычный просмотр</MenuItem>
    <MenuItem onClick={signout}>Выйти из аккаунта</MenuItem>
  </>;
}

function AccountInfo() {
  const menu = useMenu();

  const classes = useStyles();
  return <>

    <div className={classes.root}>
      <AccountCircle className={classes.icon} />
      <div className={classes._}>
        <Typography>{UserInfo.email}</Typography>
        <IconButton className={classes.menuButton} onClick={menu.open}>
          <ArrowDropDown />
        </IconButton>
      </div>
    </div>

    <MenuModal mgr={menu}>
      {Menu}
    </MenuModal>

  </>;
}

export default React.memo(AccountInfo);