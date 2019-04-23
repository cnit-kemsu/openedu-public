import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { History } from '@kemsu/router';
import { setAuthHeader } from '../../client';
import { UserInfo } from '../../classes/UserInfo';
import { validateEmail, validatePassword } from '../_shared/validate';
import { SignIn as useStyles } from './styles';

const signInQuery = `
  query signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      role
      verified
      complete
      bearer
    }
  }
`;
function onComplete({ signIn: { role, verified, complete, bearer } }, { email }) {
  UserInfo.update({ role, email, verified, complete, bearer });
  setAuthHeader(bearer);
  if (verified) History.push('/');
  else History.push('/account/verify');
}

function SignIntoAccount() {
  const signIn = useMutation(signInQuery, { onComplete });
  const form = useForm(signIn);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Войти в аккаунт" submitIcon={null}>
    <TextField comp={form} name="email" validate={validateEmail}
      label="Адрес электронной почты" className={classes.email}
    />
    <TextField comp={form} name="password" validate={validatePassword}
      type="password" label="Пароль" className={classes.password}
    />
  </Form>;
}

export default React.memo(SignIntoAccount);