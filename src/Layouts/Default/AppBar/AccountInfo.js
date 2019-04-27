import React from 'react';
import { History } from '@kemsu/router';
import { UserInfo } from '../../../classes/UserInfo';
import { useUserInfo } from '../../../hooks/useUserInfo';
import AccountView from './AccountView';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

function routeToSignIntoAccountView() {
  History.push('/account/signin');
}

function AccountInfo() {
  useUserInfo();
  return UserInfo.email === null
    ? <Button color="primary" variant="outlined" onClick={routeToSignIntoAccountView}>
      <AccountCircle style={{ marginRight: '8px' }} />
      Войти в аккаунт
    </Button>
    : <AccountView />;
}

export default React.memo(AccountInfo);