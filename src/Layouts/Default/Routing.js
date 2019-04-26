import React from 'react';
import { History, useRoute, TryRoutes } from '@kemsu/router';
import PageNotFound from '../../PageNotFound';
import AccountView from './Views/Account';
import Button from '@material-ui/core/Button';

const pageNotFound = <PageNotFound />;
const accountsView = props => <AccountView {...props}/>;

function Routing() {
  return <>
    <TryRoutes defaultOutput={pageNotFound}>
      {useRoute(/\/account\/(?<variant>signin|signup|verify)/, accountsView)}
      {useRoute(/^\/$/, () => <div style={{ marginTop: '50px', fontSize: '25px' }}>
        Главная страница
        <Button onClick={() => History.push('/admin/users')}>Users</Button>
      </div>)}
    </TryRoutes>
  </>;
}

export default React.memo(Routing);