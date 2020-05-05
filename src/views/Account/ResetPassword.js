import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { History, Location } from '@kemsu/router';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { setAuthHeader } from '@lib/client';
import { UserInfo } from '@lib/UserInfo';
import { validatePassword, validateConfirmPassword, validatePasskey } from '@lib/validate';
import { Confirm as useStyles } from './styles';

const RESET_PASSWORD = ({
  password = 'String!',
  passkey = 'String!'
}) => `
  token: resetPassword(
    password: ${password}
    passkey: ${passkey}
  ) {
    role
    email
    bearer
    picture
  }
`;
function onComplete({ token }) {
  UserInfo.update(token);
  setAuthHeader(token.bearer);
  History.push('/');
}

function ResetPassword() {
  const resetPassword = useMutation(RESET_PASSWORD, { onComplete });
  const form = useForm(resetPassword, null, validateConfirmPassword);

  const classes = useStyles();
  return <Form comp={form} submitText="Сменить пароль" submitIcon={null} resetText={null}>
    <TextField name="passkey" validate={validatePasskey}
      label="Ключ подтверждения" className={classes.passkey}
    />
    <TextField name="password" validate={validatePassword}
      type="password" label="Новый пароль" className={classes.password}
    />
    <TextField name="confirmPassword"
      type="password" label="Повторите пароль" className={classes.confirmPassword}
    />
  </Form>;
}

export default React.memo(ResetPassword);