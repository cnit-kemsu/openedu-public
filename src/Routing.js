import React from 'react';
import { History, useRoute } from '@kemsu/router';
import PageNotFound from './PageNotFound';
import AccountView from './Views/Account';
import UsersView from './Views/Users';
import Button from '@material-ui/core/Button';
//import { Routing as useStyles } from './styles';

function Routing() {
  console.log('routing');
  //const classes = useStyles();
  //<div className={classes.root}>
  return <>
    {useRoute(/\/account\/(?<variant>signin|signup|verify)/, props => <AccountView {...props} />)}
    {useRoute(/\/admin\/users/, props => <UsersView {...props}/>)}
    {useRoute(/^\/$/, () => <div style={{ marginTop: '50px', fontSize: '25px' }}>
      Главная страница
      <Button onClick={() => History.push('/admin/users')}>Users</Button>
    </div>)}
    {useRoute(<PageNotFound />)}
  </>;
}

export default React.memo(Routing);