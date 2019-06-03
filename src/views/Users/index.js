import React from 'react';
import { useRoutes } from '@kemsu/router';
import UsersView from './Users';
import CreateUserView from './CreateUser';
import EditUserView from './EditUser';

const routes = [
  [/.+\/users$/, props => <UsersView {...props} />],
  [/.+\/users\/create/, () => <CreateUserView />],
  [/.+\/users\/(?<id>\d+)\/edit/, ({ id }) => <EditUserView id={Number(id)} />]
];

export default (() => useRoutes(routes))
|> React.memo(#);