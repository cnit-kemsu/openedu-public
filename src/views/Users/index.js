import React from 'react';
import { useRoutes } from '@kemsu/router';
import UsersView from './List';
import CreateUserView from './Create';

const routes = [
  [/.+\/users$/, UsersView],
  [/.+\/users\/create/, CreateUserView]
];

function Index() {
  return useRoutes(routes);
}

export default () => <Index />;