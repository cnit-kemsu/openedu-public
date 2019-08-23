import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { useForceUpdate } from '@kemsu/force-update';
import { History } from '@kemsu/router';
import { useMenu, MenuModal } from '@kemsu/core';
import { UserInfo } from '@lib/UserInfo';
import { accountInfo } from '../updateAccountInfo';
import { AccountInfo as useStyles } from './styles';

function routeToDefaultView() { History.push('/'); }
function routeToUserProfileView() { History.push('/account/profile'); }
function signout() { UserInfo.clear(); History.push('/'); }
function Menu(close) {
  return <>
    <MenuItem onClick={routeToDefaultView}>Обычный просмотр</MenuItem>
    <MenuItem onClick={() => { routeToUserProfileView(); close(); }}>Показать профиль</MenuItem>
    <MenuItem onClick={signout}>Выйти из аккаунта</MenuItem>
  </>;
}

function AccountInfo() {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    accountInfo.current = { forceUpdate };
    return () => { accountInfo.current = null; };
  });
  const menu = useMenu();

  const classes = useStyles();
  return <>

    <div className={classes.root}>
      <ListItemAvatar>{
        UserInfo.pictureFileId
        ? <Avatar className={classes.image} src={'/files/' + UserInfo.pictureFileId} />
        : <AccountCircle className={classes.icon} />
      }</ListItemAvatar>
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