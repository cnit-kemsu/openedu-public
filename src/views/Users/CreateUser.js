import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { Mutation } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Link, FormErrors, Notifications } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import { validateEmail } from '@lib/validate';
import CreateFab from '@components/CreateFab';
import ResetButton from '@components/ResetButton';
import UserRoleSelect from './UserRoleSelect';
import { UserForm as useStyles } from './styles';

function CreateUser() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.email} name="email" validate={validateEmail}
      label="Адрес электронной почты"
    />
    <UserRoleSelect className={classes.role} />
  </div>;
}
CreateUser = React.memo(CreateUser);

const CREATE_USER = ({
  role = 'RoleInputEnum!',
  email = 'String!'
}) => `
  createUser(
    role: ${role}
    email: ${email}
  )
`;
function onComplete() {
  History.push('/admin/users');
  Notifications.push('Пользователь был успешно создан.', 'success');
}
const createUser = new Mutation(CREATE_USER, { onComplete }).commit;

export default (() => {
  const form = useForm(createUser);

  return <Fields comp={form}>
    <AdminView.AppBar>
      <AdminView.LeftBar>
        <RouteBackBtn path="/admin/users" />
        <Typography variant="h6">Новый пользователь</Typography>
      </AdminView.LeftBar>
      <ResetButton />
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Link styled path="/admin/users">Пользователи</Link>
      <Typography color="textPrimary">Создать</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CreateUser />
    </AdminView.Paper>
    <AdminView.Div>
      <FormErrors />
    </AdminView.Div>
    <CreateFab />
  </Fields>;
}
) |> React.memo(#);