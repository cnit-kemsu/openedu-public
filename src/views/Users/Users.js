import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, ListNavigator, MenuModal, DialogModal, Fab } from '@kemsu/core';
import { changeOffset, adjustOffset } from '@lib/listnav';
import AdminView from '@components/AdminView';
import RefreshBtn from '@components/RefreshBtn';
import UserItem from './UserItem';
import UserContextMenu from './UserContextMenu';
import ConfirmDeleteUserDialog from './ConfirmDeleteUserDialog';

export const limit = 5;

export const TOTAL_USERS = () => `
  totalUsers(roles: [ADMIN, INSTRUCTOR])
`;
export const USERS = ({ offset = 'Int' }) => `
  allUsers(offset: ${offset}, limit: ${limit}, roles: [ADMIN, INSTRUCTOR]) {
    id
    role
    email
    verified
    firstname
    lastname
    middlename
    picture
  }
`;

function Users({ offset, menu }) {
  
  const [{ totalUsers }] = useQuery(TOTAL_USERS);
  adjustOffset(totalUsers, offset, limit);
  const [{ allUsers: users }, loading, errors] = useQuery(USERS, { offset });
  const userItems = useElementArray(UserItem, users, { key: user => user.id, menu });

  return <Loader loading={loading} errors={errors}>
    {users && <List>
      {userItems}
    </List>}
    {totalUsers > 0 && <ListNavigator {...{ limit, offset }} total={totalUsers} onChange={changeOffset} />}
  </Loader>;
}
Users = React.memo(Users);

function routeToCreateUserView() { History.push('/admin/users/create'); }

export default (props => {
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ confirmDeleteDialog });
  
  return <>
    <AdminView.AppBar>
      <Typography variant="h6">
        Список пользователей
        <RefreshBtn queries={[TOTAL_USERS, USERS]} />
      </Typography>
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Typography color="textPrimary">Пользователи</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <Users {...{ menu, ...props}} />
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