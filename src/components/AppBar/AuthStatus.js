import React from 'react';
import Button from '@material-ui/core/Button';
import { History, useRoute } from '@kemsu/router';
import { UserInfo } from '@lib/UserInfo';
import { useUserInfoUpdateSubscription } from '@lib/useUserInfoUpdateSubscription';
import AccountInfo from './AccountInfo';
import { AccountStatus as useStyles } from './styles';

function routeToSignIntoAccountView() { History.push('/account/signin'); }
function routeToSignUpAccountView() { History.push('/account/signup'); }

function AuthStatus() {
  useUserInfoUpdateSubscription();
  const hideButtons = useRoute(/account\/(signin|signup)/);

  const classes = useStyles();
  if (UserInfo.email !== null) return <AccountInfo />;
  if (hideButtons !== undefined) return null;
  return <div>
    <Button color="default" className={classes.registerButton} onClick={routeToSignUpAccountView}>
      Регистрация
    </Button>
    <Button color="primary" onClick={routeToSignIntoAccountView}>
      Войти
    </Button>
  </div>;
}

export default React.memo(AuthStatus);