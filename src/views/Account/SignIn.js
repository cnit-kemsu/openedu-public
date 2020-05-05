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
import { Button } from '@material-ui/core';

const SIGN_INTO_ACCOUNT = ({
  email = 'String!',
  password = 'String!'
}) => `
  token: signIntoAccount(
    email: ${email}
    password: ${password}
  ) {
    role
    verified
    complete
    bearer
    picture
  }
`;
function onComplete({ token }, { email }) {
  UserInfo.update({ ...token, email });
  setAuthHeader(token.bearer);
  if (token.verified) History.push('/');
  else History.push('/account/verify');
}
const signIntoAccount = new Mutation(SIGN_INTO_ACCOUNT, { onComplete }).commit;

function SignIntoAccount() {
  const form = useForm(signIntoAccount);

  const classes = useStyles();
  return <Form comp={form} submitText="Войти в аккаунт" submitIcon={null} resetText={null}>
    <TextField name="email" validate={validateEmail}
      label="Адрес электронной почты" className={classes.email}
    />
    <TextField name="password" validate={validatePassword}
      type="password" label="Пароль" className={classes.password}
    />
    <div>
      <Button style={{ marginTop: '24px' }} color="primary" onClick={() => History.push('/account/reset-password-start')}>Забыли пароль?</Button>
    </div>
  </Form>;
}

export default React.memo(SignIntoAccount);