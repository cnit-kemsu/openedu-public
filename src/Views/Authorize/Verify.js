import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { Router } from '@kemsu/router';
import { setAuthHeader } from '../../client';
import { UserInfo } from '../../classes/UserInfo';
import { Verify as useStyles } from './styles';

const verifyStudentMutation = `
  mutation verifyStudent($code: String!) {
    verifyStudent(code: $code)
  }
`;
function onComplete({ verifyStudent: bearer }) {
  UserInfo.update({ verified: true, bearer });
  setAuthHeader(bearer);
  Router.push('/');
}

function validateCode(value) {
  if (!value) return 'Необходимо ввести код подтверждения';
}

function VerifyView() {
  const verifyStudent = useMutation(verifyStudentMutation, { onComplete });
  const form = useForm(verifyStudent);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Подтвердить" submitIcon={null}>
    <TextField comp={form} name="code" validate={validateCode}
      label="Код подтверждения" className={classes.code}
    />
  </Form>;
}

export default React.memo(VerifyView);