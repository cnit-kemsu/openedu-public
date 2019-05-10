import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, ListNavigator, MenuModal, DialogModal, Fab } from '@kemsu/core';
import { changeOffset } from '@lib/listnav';
import AdminView from '@components/AdminView';
import UserItem from './UserItem';
import UserContextMenu from './UserContextMenu';
import ConfirmDeleteUserDialog from './ConfirmDeleteUserDialog';

const totalUsersQuery = `
  query totalUsers {
    totalUsers
  }
`;
const usersQuery = `
  query users($offset: Int) {
    users(offset: $offset) {
      id
      role
      email
      verified
      firstname
      lastname
    }
  }
`;

function Users({ offset, menu }) {
  
  const [{ totalUsers }, loading_totalUsers, refetch_totalUsers] = useQuery(totalUsersQuery);
  const [{ users }, loading_users, refetch_users] = useQuery(usersQuery, { offset });
  const userItems = useElementArray(UserItem, users, {
    key: user => user.id, menu,
    refreshList: () => {
      refetch_totalUsers();
      refetch_users();
    }
  });

  return <Loader loading={loading_totalUsers || loading_users}>
    {users !== undefined && <List>
      {userItems}
    </List>}
    {totalUsers > 0 && <ListNavigator total={totalUsers} offset={offset} onChange={changeOffset} />}
  </Loader>;
}
Users = React.memo(Users);

function routeToCreateUserView() { History.push('/admin/users/create'); }

export default (props => {
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ confirmDeleteDialog });
  
  return <>
    <AdminView.AppBar>
      <Typography variant="h6">Список пользователей</Typography>
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Typography color="textPrimary">Пользователи</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <Users {...props} {...{ menu }}  />
    </AdminView.Paper>
    <Fab icon={AddIcon} onClick={routeToCreateUserView}>
      Создать
    </Fab>

    <MenuModal mgr={menu}>
      {UserContextMenu}
    </MenuModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteUserDialog}
    </DialogModal>
  </>;
})
|> React.memo(#);