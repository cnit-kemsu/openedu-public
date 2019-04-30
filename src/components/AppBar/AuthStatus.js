import React from 'react';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { History } from '@kemsu/router';
import { UserInfo } from '@lib/UserInfo';
import { useUserInfoUpdateSubscription } from '@lib/useUserInfoUpdateSubscription';
import AccountInfo from './AccountInfo';
import { AccountStatus as useStyles } from './styles';

function routeToSignIntoAccountView() { History.push('/account/signin'); }

function AuthStatus() {
  useUserInfoUpdateSubscription();

  const classes = useStyles();
  return UserInfo.email === null
    ? <Button color="primary" variant="outlined" onClick={routeToSignIntoAccountView}>
      <AccountCircle className={classes.buttonIcon} />
      Войти в аккаунт
    </Button>
    : <AccountInfo />;
}

export default React.memo(AuthStatus);