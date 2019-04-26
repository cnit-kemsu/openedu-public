import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { History } from '@kemsu/router';
import { setAuthHeader } from '../../../../client';
import { UserInfo } from '../../../../classes/UserInfo';
import { Verify as useStyles } from './styles';

const verifyAccountMutation = `
  mutation verifyAccount($passkey: String!) {
    bearer: verifyAccount(passkey: $passkey)
  }
`;
function onComplete({ bearer }) {
  UserInfo.update({ verified: true, bearer });
  setAuthHeader(bearer);
  History.push('/');
}

function validatePasskey(value) {
  if (!value) return 'Необходимо ввести ключ подтверждения';
}

function VerifyAccount() {
  const verifyAccount = useMutation(verifyAccountMutation, { onComplete });
  const form = useForm(verifyAccount);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Подтвердить" submitIcon={null}>
    <TextField comp={form} name="passkey" validate={validatePasskey}
      label="Ключ подтверждения" className={classes.code}
    />
  </Form>;
}

export default React.memo(VerifyAccount);