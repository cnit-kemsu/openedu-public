import React from 'react';
import { History } from '@kemsu/router';
import { UserInfo } from '../../../classes/UserInfo';
import { useUserInfoUpdateSubscription } from '../../../hooks/useUserInfoUpdateSubscription';
import AccountView from './AccountView';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AccountInfo as useStyles } from './styles';

function routeToSignIntoAccountView() {
  History.push('/account/signin');
}

function AccountInfo() {
  useUserInfoUpdateSubscription();

  const classes = useStyles();
  return UserInfo.email === null
    ? <Button color="primary" variant="outlined" onClick={routeToSignIntoAccountView}>
      <AccountCircle className={classes.accountIcon} />
      Войти в аккаунт
    </Button>
    : <AccountView />;
}

export default React.memo(AccountInfo);