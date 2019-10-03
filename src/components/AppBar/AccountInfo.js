import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useForceUpdate } from '@kemsu/force-update';
import { History } from '@kemsu/router';
import { useMenu, MenuModal } from '@kemsu/core';
import { UserInfo } from '@lib/UserInfo';
import { allowedToAdmin } from '@lib/auth';
import { accountInfo } from '../updateAccountInfo';
import { AccountInfo as useStyles } from './styles';

function routeToAdminView() { History.push('/admin'); }
function routeToUserProfileView() { History.push('/account/profile'); }
function routeToMyCoursesView() { History.push('/my-courses'); }
function signout() { UserInfo.clear(); History.push('/'); }

function Menu(close) {
  return <>
    {allowedToAdmin() && <MenuItem onClick={routeToAdminView}>Администрирование</MenuItem>}
    <MenuItem onClick={() => { routeToUserProfileView(); close(); }}>Показать профиль</MenuItem>
    {(UserInfo.role === 'student' || UserInfo.role === 'instructor') && <MenuItem onClick={() => { routeToMyCoursesView(); close(); }}>Мои курсы</MenuItem>}
    <MenuItem onClick={() => { close(); signout(); }}>Выйти из аккаунта</MenuItem>
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
  return <div className={classes.root}>
    <ListItemAvatar>{
      UserInfo.pictureFileId
      ? <Avatar src={'/files/' + UserInfo.pictureFileId} />
      : <AccountCircle className={classes.icon} />
    }</ListItemAvatar>
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