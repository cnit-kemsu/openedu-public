import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@kemsu/core';
import AdminView from '@components/AdminView';

function CreateUser() {
  
  return <div>Create user view...</div>;
}
CreateUser = React.memo(CreateUser);

export default (props => <>
  <AdminView.AppBar>
    <Typography variant="h6">Новый пользователь</Typography>
  </AdminView.AppBar>
  <AdminView.Breadcrumbs>
    <Typography>Администрирование</Typography>
    <Link styled path="/admin/users">Пользователи</Link>
    <Typography color="textPrimary">Создать</Typography>
  </AdminView.Breadcrumbs>
  <AdminView.Paper>
    <CreateUser {...props}/>
  </AdminView.Paper>
</>)
|> React.memo(#);