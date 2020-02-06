import React from 'react';
import { useRoutes } from '@kemsu/router';
import PassTokensView from './PassTokens';
import CreatePassTokenView from './CreatePassToken';
import EditPassTokenView from './EditPassToken';

const routes = [
  [/.+\/pass-tokens$/, props => <PassTokensView {...props} />],
  [/.+\/pass-tokens\/create/, () => <CreatePassTokenView />],
  [/.+\/pass-tokens\/(?<id>\d+)\/edit/, ({ id }) => <EditPassTokenView id={Number(id)} />]
];

export default (() => useRoutes(routes))
|> React.memo(#);