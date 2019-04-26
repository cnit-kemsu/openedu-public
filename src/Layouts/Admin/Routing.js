import React from 'react';
import { useRoute, TryRoutes } from '@kemsu/router';
import PageNotFound from '../../PageNotFound';
import UsersView from './Views/Users';

const pageNotFound = <PageNotFound />;
const usersView = props => <UsersView {...props}/>;

function Routing() {
  return <>
    <TryRoutes defaultOutput={pageNotFound}>
      {useRoute(/\/admin\/users/, usersView)}
    </TryRoutes>
  </>;
}

export default React.memo(Routing);