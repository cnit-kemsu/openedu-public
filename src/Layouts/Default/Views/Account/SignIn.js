import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { History } from '@kemsu/router';
import { setAuthHeader } from '../../../../client';
import { UserInfo } from '../../../../classes/UserInfo';
import { validateEmail, validatePassword } from '../_shared/validate';
import { SignIn as useStyles } from './styles';

const signIntoAccountQuery = `
  query signIntoAccount($email: String!, $password: String!) {
    token: signIntoAccount(email: $email, password: $password) {
      role
      verified
      complete
      bearer
    }
  }
`;
function onComplete({ token }, { email }) {
  UserInfo.update({ ...token, email });
  setAuthHeader(token.bearer);
  if (token.verified) History.push('/');
  else History.push('/account/verify');
}

function SignIntoAccount() {
  const signIntoAccount = useMutation(signIntoAccountQuery, { onComplete });
  const form = useForm(signIntoAccount);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Войти" submitIcon={null}>
    <TextField comp={form} name="email" validate={validateEmail}
      label="Адрес электронной почты" className={classes.email}
    />
    <TextField comp={form} name="password" validate={validatePassword}
      type="password" label="Пароль" className={classes.password}
    />
  </Form>;
}

export default React.memo(SignIntoAccount);