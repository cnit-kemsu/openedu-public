import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { Fab } from '@kemsu/core';
import { useElementArray, Loader, List, ListNavigator } from '@kemsu/core';
import { changeOffset } from '@lib/listnav';
import AdminView from '@components/AdminView';

const totalUsersQuery = `
  query totalUsers {
    totalUsers: totalStudents
  }
`;
const usersQuery = `
  query users($offset: Int) {
    users: students(offset: $offset) {
      id
      email
    }
  }
`;

function UserItem({ role, email }) {
  console.log('UserItemView');
  return (
    <ListItem>
      <div>
        <div>
          {email}
        </div>
        <div>
          {role}
        </div>
      </div>
    </ListItem>
  );
}

function Users({ offset }) {
  
  const [{ totalUsers }, loading_totalUsers] = useQuery(totalUsersQuery);
  const [{ users }, loading_users] = useQuery(usersQuery, { offset });
  const userItems = useElementArray(UserItem, users, { key: user => user.id });

  return <Loader loading={loading_totalUsers || loading_users}>
    {users !== undefined && <List>
      {userItems}
    </List>}
    {totalUsers > 0 && <ListNavigator total={totalUsers} offset={offset} onChange={changeOffset} />}
  </Loader>;
}
Users = React.memo(Users);

function routeToCreateUserView() { History.push('/admin/users/create'); }

export default (props => <>
  <AdminView.AppBar>
    <Typography variant="h6">Список пользователей</Typography>
  </AdminView.AppBar>
  <AdminView.Breadcrumbs>
    <Typography>Администрирование</Typography>
    <Typography color="textPrimary">Пользователи</Typography>
  </AdminView.Breadcrumbs>
  <AdminView.Paper>
    <Users {...props}/>
  </AdminView.Paper>
  <Fab icon={AddIcon} onClick={routeToCreateUserView}>
    Создать пользователя
  </Fab>
</>)
|> React.memo(#);