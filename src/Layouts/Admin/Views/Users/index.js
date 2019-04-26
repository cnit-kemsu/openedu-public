import React from 'react';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, Loader, List, ListNavigator } from '@kemsu/core';
import { changeOffset } from '../../../../pagination';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
//import useStyles from './styles';
import { makeStyles } from "@material-ui/core/styles";
import { AppBarContent } from '../../../../classes/AppBarContent';
import { Typography } from '@material-ui/core';

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



export const useStyles = makeStyles(theme => ({
  main: {
    padding: '64px'
  }
}));

const appBar = <Typography>Пользователи</Typography>;

function Users({ offset }) {
  
  AppBarContent.update(appBar);
  const [{ totalUsers }, loading_totalUsers] = useQuery(totalUsersQuery);
  const [{ users }, loading_users] = useQuery(usersQuery, { offset });
  const userItems = useElementArray(UserItem, users, { key: user => user.id });

  const classess = useStyles();
  return <div className={classess.main}>
    <Paper style={{ padding: '32px' }}>
      <Loader loading={loading_totalUsers || loading_users}>
        {users !== undefined && <List>
          {userItems}
        </List>}
        {totalUsers > 0 && <ListNavigator total={totalUsers} offset={offset} onChange={changeOffset} />}
      </Loader>
    </Paper>
  </div>;
}

export default React.memo(Users);