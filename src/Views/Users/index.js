import React from 'react';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, List, Paginator } from '@kemsu/core';
import { changeOffset } from '../../pagination';
import ListItem from '@material-ui/core/ListItem';
//import useStyles from './styles';

const totalUsersQuery = `
  query totalUsers {
    totalStudents
  }
`;
const usersQuery = `
  query users($offset: Int) {
    students(offset: $offset) {
      id
      email
    }
  }
`;

function UserItemView({ role, email }) {
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
  
  const [{ totalStudents }, , loading1, ] = useQuery(totalUsersQuery);
  const [{ students }, , loading2, ] = useQuery(usersQuery, { offset });
  const userItems = useElementArray(UserItemView, students, { key: user => user.id });

  return <div>
    <List>
      {userItems}
    </List>
    {!loading1 && <Paginator total={totalStudents} offset={offset} onChange={changeOffset} />}
  </div>;
}

export default React.memo(Users);