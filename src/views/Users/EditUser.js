import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation, useQuery } from '@kemsu/graphql-client';
import { useForm, useInitialize } from '@kemsu/form';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
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

export const USER = ({ id = 'Int!' }) => `
  userInfo(id: ${id}) {
    role
    email
  }
`;

export default (
  ({ id }) => {
    const [{ userInfo: { email, role } = {} }, loading, errors] = useQuery(USER, { id });
    const updateRole = useMutation(UPDATE_ROLE, { onComplete }, { id });
    const form = useForm(updateRole);
    useInitialize(form, () => ({ role }), [role]);

    return <>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path="/admin/users" />
          <Typography variant="h6">Редактирование пользователя: {email}</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ form, loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/users">Пользователи</Link>
        <Typography color="textPrimary">Изменить</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <Loader loading={loading} errors={errors}>
          {role && <EditUser form={form}/>}
        </Loader>
      </AdminView.Paper>
      <AdminView.Div>
        <FormErrors form={form} />
      </AdminView.Div>
      <UpdateFab {...{ form, loading, errors }} />
    </>;
  }
) |> React.memo(#);