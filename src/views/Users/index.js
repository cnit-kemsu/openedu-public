import React from 'react';
import { useRoutes } from '@kemsu/router';
import UsersView from './Users';
import CreateUserView from './CreateUser';

const routes = [
  [/.+\/users$/, props => <UsersView {...props} />],
  [/.+\/users\/create/, () => <CreateUserView />]
];

export default (() => useRoutes(routes))
|> React.memo(#);