import React from 'react';
import { History } from '@kemsu/router';
import { UserInfo } from '../../../classes/UserInfo';
import { useUserInfo } from '../../../hooks/useUserInfo';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AccountInfo as useStyles } from './styles';

function routeToSignIntoAccountView() {
  History.push('/account/signin');
}
function deleteUserInfo() {
  UserInfo.clear();
  History.push('/');
}

function AccountInfo() {
  useUserInfo();

  const classes = useStyles();

  return UserInfo.email === null
  ? <Button color="inherit" variant="outlined" onClick={routeToSignIntoAccountView}>Войти</Button>
  : <>
    <Typography color="inherit" className={classes.emailTitle}>{UserInfo.email}</Typography>
    <Button color="inherit" variant="outlined" onClick={deleteUserInfo}>Выйти</Button>
  </>;
}

export default React.memo(AccountInfo);