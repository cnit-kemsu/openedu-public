import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { History } from '@kemsu/router';
import { setAuthHeader } from '../../client';
import { UserInfo } from '../../classes/UserInfo';
import { validateEmail, validatePassword, validateConfirmPassword, validateFirstname, validateLastname } from '../_shared/validate';
import { SignUp as useStyles } from './styles';

const signUpAccountMutation = `
  mutation signUpAccount(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
  ) {
    bearer: signUpAccount(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
    )
  }
`;
function onComplete({ bearer }, { email }) {
  UserInfo.update({ role: 'student', email, verified: false, complete: true, bearer });
  setAuthHeader(bearer);
  History.push('/account/verify');
}

function SignUpAccount() {
  const signUpAccount = useMutation(signUpAccountMutation, { onComplete });
  const form = useForm(signUpAccount, validateConfirmPassword);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Создать аккаунт" submitIcon={null}>
    <TextField comp={form} name="email" validate={validateEmail}
      label="Адрес электронной почты" className={classes.email}
    />
    <TextField comp={form} name="password" validate={validatePassword}
      type="password" label="Пароль" className={classes.password}
    />
    <TextField comp={form} name="confirmPassword"
      type="password" label="Повторите пароль" className={classes.confirmPassword}
    />
    <TextField comp={form} name="firstname" validate={validateFirstname}
      label="Имя" className={classes.firstname}
    />
    <TextField comp={form} name="lastname" validate={validateLastname}
      label="Фамилия" className={classes.lastname}
    />
  </Form>;
}

export default React.memo(SignUpAccount);