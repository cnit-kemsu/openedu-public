import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, ListNavigator, MenuModal, DialogModal, Fab } from '@kemsu/core';
import { changeOffset, adjustOffset } from '@lib/listnav';
import AdminView from '@components/AdminView';
import RefreshBtn from '@components/RefreshBtn';
import PassTokenItem from './PassTokenItem';
import PassTokenContextMenu from './PassTokenContextMenu';
import ConfirmDeletePassTokenDialog from './ConfirmDeletePassTokenDialog';

export const limit = 5;

export const TOTAL_PASSTOKENS = () => `
  totalPassTokens
`;
export const PASSTOKENS = ({ offset = 'Int' }) => `
  allPassTokens(offset: ${offset}, limit: ${limit}) {
    id
    comments
    course {
      name
    }
  }
`;

function PassTokens({ offset, menu }) {
  
  const [{ totalPassTokens }] = useQuery(TOTAL_PASSTOKENS);
  adjustOffset(totalPassTokens, offset, limit);
  const [{ allPassTokens }, loading, errors] = useQuery(PASSTOKENS, { offset });
  const userItems = useElementArray(PassTokenItem, allPassTokens, { key: user => user.id, menu });

  return <Loader loading={loading} errors={errors}>
    {allPassTokens && <List>
      {userItems}
    </List>}
    {totalPassTokens > 0 && <ListNavigator {...{ limit, offset }} total={totalPassTokens} onChange={changeOffset} />}
  </Loader>;
}
PassTokens = React.memo(PassTokens);

function routeToCreatePassTokenView() { History.push('/admin/pass-token/create'); }

export default (props => {
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ confirmDeleteDialog });
  
  return <>
    <AdminView.AppBar>
      <Typography variant="h6">
        Список пропусков
        <RefreshBtn queries={[TOTAL_PASSTOKENS, PASSTOKENS]} />
      </Typography>
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Typography color="textPrimary">Пропуска</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <Users {...{ menu, ...props}} />
    </AdminView.Paper>
    <Fab icon={AddIcon} onClick={routeToCreatePassTokenView}>
      Создать
    </Fab>

    <MenuModal mgr={menu}>
      {PassTokenContextMenu}
    </MenuModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeletePassTokenDialog}
    </DialogModal>
  </>;
})
|> React.memo(#);