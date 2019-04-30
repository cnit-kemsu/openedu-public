import React from 'react';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, Loader, List, ListNavigator } from '@kemsu/core';
import { AppBar, Breadcrumbs, Paper } from '../../components/AdminLayout';
import { changeOffset } from '../../lib/listnav';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
    <Link onClick={() => History.push('/admin/users/create')}>Create</Link>
    {totalUsers > 0 && <ListNavigator total={totalUsers} offset={offset} onChange={changeOffset} />}
  </Loader>;
}
//Users = React.memo(Users);

export default props => <>
  <AppBar>
    <Typography variant="h6">Список пользователей</Typography>
  </AppBar>
  <Breadcrumbs>
    <Typography>Администрирование</Typography>
    <Typography color="textPrimary">Пользователи</Typography>
  </Breadcrumbs>
  <Paper>
    <Users {...props}/>
  </Paper>
</>;