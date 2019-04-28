import React from 'react';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, Loader, List, ListNavigator } from '@kemsu/core';
import { changeOffset } from '../../../../pagination';
import ListItem from '@material-ui/core/ListItem';
import { BarHeader, TextCrumb } from '../_shared';

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

export default props => ([
  <BarHeader>Список пользователей</BarHeader>,
  [<TextCrumb>Пользователи</TextCrumb>],
  <Users {...props} />
]);