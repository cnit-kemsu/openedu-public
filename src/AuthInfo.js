import React from 'react';
import { History } from '@kemsu/router';
import { UserInfo } from './classes/UserInfo';
import { useUserInfo } from './hooks/useUserInfo';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { AuthInfo as useStyles } from './styles';

function routeToSignIntoAccountView() {
  History.push('/account/signin');
}

function deleteUserInfo() {
  UserInfo.clear();
  History.push('/account/signin');
}

function AuthInfo({ variant = 'bar' }) {
  useUserInfo();

  const classes = useStyles();

  if (variant === 'bar') return UserInfo.email === null
  ? <Button color="inherit" variant="outlined" onClick={routeToSignIntoAccountView}>Войти</Button>
  : <>
    <Typography color="inherit" className={classes.emailTitle}>{UserInfo.email}</Typography>
    <Button color="inherit" variant="outlined" onClick={deleteUserInfo}>Выйти</Button>
  </>;

  if (variant === 'drawer') return <div className={classes.drawer_account}>
      <AccountIcon className={classes.drawer_userIcon} />
      <div className={classes.drawer_userEmail}>
        <Typography>{UserInfo.email}</Typography>
        {/* TODO: place icon */}
      </div>
  </div>;
}

export default React.memo(AuthInfo);