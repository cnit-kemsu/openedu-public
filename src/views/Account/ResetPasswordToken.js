import React from 'react';
import { Mutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { History } from '@kemsu/router';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { setAuthHeader } from '@lib/client';
import { UserInfo } from '@lib/UserInfo';
import { validateEmail, validatePassword } from '@lib/validate';
import { SignIn as useStyles } from './styles';

const RESET_PASSWORD_TOKEN = ({
  email = 'String!',
}) => `
  result: resetPasswordToken(
    email: ${email}
  )
`;
function onComplete({ result }) {
  if (result > 0) History.push('/account/reset-password');
}
const resetPasswordToken = new Mutation(RESET_PASSWORD_TOKEN, { onComplete }).commit;

function ResetPasswordToken() {
  const form = useForm(resetPasswordToken);

  const classes = useStyles();
  return <Form comp={form} submitText="Продолжить" submitIcon={null} resetText={null}>
    <TextField name="email" validate={validateEmail}
      label="Адрес электронной почты" className={classes.email}
    />
  </Form>;
}

export default React.memo(ResetPasswordToken);