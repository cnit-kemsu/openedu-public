import React from 'react';
import { History } from '@kemsu/router';
import { AppBar, Breadcrumbs, Paper } from '../../components/AdminLayout';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function CreateUser() {
  
  return <div>Create user view...</div>;
}
//CreateUser = React.memo(CreateUser);

export default props => <>
  <AppBar>
    <Typography variant="h6">Новый пользователь</Typography>
  </AppBar>
  <Breadcrumbs>
    <Typography>Администрирование</Typography>
    <Link onClick={() => History.push('/admin/users')}>Пользователи</Link>
    <Typography color="textPrimary">Создать</Typography>
  </Breadcrumbs>
  <Paper>
    <CreateUser {...props}/>
  </Paper>
</>;