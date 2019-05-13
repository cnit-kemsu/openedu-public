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

const CONFIRM_ACCOUNT = `
  mutation confirmAccount($email: String!, $password: String!, $passkey: String!) {
    bearer: confirmAccount(email: $email, password: $password, passkey: $passkey)
  }
`;
function onComplete({ bearer }, { email }) {
  UserInfo.update({ email, verified: true, complete: false, bearer });
  setAuthHeader(bearer);
  History.push('/account/complete');
}

function ConfirmAccount() {
  const confirmAccount = useMutation(CONFIRM_ACCOUNT, { onComplete }, { email: Location.search.email });
  const form = useForm(confirmAccount, validateConfirmPassword);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Продолжить" submitIcon={null}>
    <TextField comp={form} name="passkey" validate={validatePasskey}
      label="Ключ подтверждения" className={classes.passkey}
    />
    <TextField comp={form} name="password" validate={validatePassword}
      type="password" label="Пароль" className={classes.password}
    />
    <TextField comp={form} name="confirmPassword"
      type="password" label="Повторите пароль" className={classes.confirmPassword}
    />
  </Form>;
}

export default React.memo(ConfirmAccount);