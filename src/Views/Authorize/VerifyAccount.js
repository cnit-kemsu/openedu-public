import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { History } from '@kemsu/router';
import { setAuthHeader } from '../../client';
import { UserInfo } from '../../classes/UserInfo';
import { Verify as useStyles } from './styles';

const verifyStudentMutation = `
  mutation verifyStudent($verifyCode: String!) {
    verifyStudent(verifyCode: $verifyCode)
  }
`;
function onComplete({ verifyStudent: bearer }) {
  UserInfo.update({ verified: true, bearer });
  setAuthHeader(bearer);
  History.push('/');
}

function validateVerifyCode(value) {
  if (!value) return 'Необходимо ввести код подтверждения';
}

function VerifyAccount() {
  const verifyStudent = useMutation(verifyStudentMutation, { onComplete });
  const form = useForm(verifyStudent);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Подтвердить" submitIcon={null}>
    <TextField comp={form} name="verifyCode" validate={validateVerifyCode}
      label="Код подтверждения" className={classes.code}
    />
  </Form>;
}

export default React.memo(VerifyAccount);