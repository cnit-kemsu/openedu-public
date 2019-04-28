import React from 'react';
import { History, useRoutes } from '@kemsu/router';
import pageNotFound from '../../PageNotFound';
import AccountView from './Views/Account';
import Button from '@material-ui/core/Button';

const accountsView = props => <AccountView {...props}/>;

const routes = [
  [/\/account\/(?<variant>signin|signup|verify)/, accountsView],
  [
    /^\/$/, 
    () => <div style={{ marginTop: '50px', fontSize: '25px' }}>
      Главная страница
      <Button onClick={() => History.push('/admin/users')}>Users</Button>
    </div>
  ]
];

function Routing() {
  return useRoutes(routes) || pageNotFound;
}

export default React.memo(Routing);