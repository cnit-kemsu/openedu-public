import React from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import { History } from '@kemsu/router';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField, Select } from '@kemsu/inputs';
import { Link, SubmitFab, ResetButton, FormErrors } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import { validateEmail } from '@lib/validate';
import { CreateUser as useStyles } from './styles';

export function validateRole(value) {
  if (!value) return 'Необходимо указать роль';
}

function CreateUser({ form }) {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.email} comp={form} name="email" validate={validateEmail}
      label="Адрес электронной почты"
    />
    <Select className={classes.role} comp={form} name="role" validate={validateRole} label="Роль">
      <MenuItem value="ADMIN">Администратор</MenuItem>
      <MenuItem value="INSTRUCTOR">Преподаватель</MenuItem>
    </Select>
  </div>;
}
CreateUser = React.memo(CreateUser);

const createUserMutation = `
  mutation createUser(
    $role: RoleEnum!
    $email: String!
  ) {
    createUser(
      role: $role
      email: $email
    )
  }
`;
function onComplete() {
  History.push('/admin/users');
}

export default (props => {
  const signUpAccount = useMutation(createUserMutation, { onComplete });
  const form = useForm(signUpAccount);

  return <>
    <AdminView.AppBar>
      <span style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
        <RouteBackBtn path="/admin/users" />
        <Typography variant="h6">Новый пользователь</Typography>
      </span>
      <ResetButton form={form}>Очистить</ResetButton>
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Link styled path="/admin/users">Пользователи</Link>
      <Typography color="textPrimary">Создать</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CreateUser form={form} {...props}/>
    </AdminView.Paper>
    <FormErrors form={form} />
    <SubmitFab form={form} icon={SaveIcon}>Сохранить</SubmitFab>
  </>;
}
) |> React.memo(#);