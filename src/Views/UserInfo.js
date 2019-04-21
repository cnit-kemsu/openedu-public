import React from 'react';
import { Router } from '@kemsu/router';
import { UserInfo } from '../classes/UserInfo';
import { useUserInfo } from '../hooks/useUserInfo';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UserInfo as useStyles } from './styles';

function routeToSignInView() {
  Router.push('/signin');
}

function signout() {
  UserInfo.clear();
  Router.push('/signin');
}

function UserInfoView() {
  useUserInfo();

  const classes = useStyles();
  return UserInfo.email === null
  ? <Button color="inherit" variant="outlined" onClick={routeToSignInView}>Войти</Button>
  : <>
    <Typography color="inherit" className={classes.emailTitle}>{UserInfo.email}</Typography>
    <Button color="inherit" variant="outlined" onClick={signout}>Выйти</Button>
  </>;
}

export default React.memo(UserInfoView);