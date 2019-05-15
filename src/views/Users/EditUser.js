import React from 'react';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import { History } from '@kemsu/router';
import { Mutation, useQuery } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { Link, SubmitFab, ResetButton, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UserRoleSelect from './UserRoleSelect';
import { UserForm as useStyles } from './styles';

function EditUser({ form }) {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <UserRoleSelect className={classes.role} comp={form} />
  </div>;
}
EditUser = React.memo(EditUser);

const UPDATE_ROLE = ({
  id = 'Int!',
  role = 'RoleEnum!'
}) => `
  updateRole(
    id: ${id}
    role: ${role}
  )
`;
function onComplete() {
  History.push('/admin/users');
  Notifications.push('Пользователь был успешно обновлен.', 'success');
}
const updateRole = new Mutation(UPDATE_ROLE, { onComplete }).commit;

export const USER = ({ id = 'Int!' }) => `
  userInfo(id: ${id}) {
    role
    email
  }
`;

export default (
  ({ id, userInfo, loading, errors }) => {
    const form = useForm(input => updateRole({ id , ...input }), null, () => ({ ...userInfo }));

    return <>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path="/admin/users" />
          <Typography variant="h6">Редактирование пользователя: {userInfo?.email}</Typography>
        </AdminView.LeftBar>
        <ResetButton disabled={loading || Boolean(errors)} form={form}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/users">Пользователи</Link>
        <Typography color="textPrimary">Изменить</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <Loader loading={loading} errors={errors}>
          {userInfo && <EditUser form={form}/>}
        </Loader>
      </AdminView.Paper>
      <AdminView.Div>
        <FormErrors form={form} />
      </AdminView.Div>
      <SubmitFab disabled={loading || Boolean(errors)} form={form} icon={SaveIcon}>Сохранить изменения</SubmitFab>
    </>;
  }
) |> (
  ({ id }) => {
    const [{ userInfo }, loading, errors] = useQuery(USER, { id });
    return <Loader loading={loading} errors={errors}>
      {userInfo && React.createElement(#, { id, userInfo })}
    </Loader>;
  }
) |> React.memo(#);