import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { setAuthToken } from '../client';
import { Router } from '@kemsu/router';

const signinQuery = `
  query signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      id
      role
      email
      verified
      bearer
    }
  }
`;

function validateLogin(value) {
  if (!value) return 'Необходимо указать адрес электронной почты';
  return undefined;
}
function validatePassword(value) {
  if (!value) return 'Необходимо ввести пароль';
  return undefined;
}

function completeSignin({ signIn}) {
  setAuthToken(signIn);
  Router.push({ pathname: '/' });
}

function SigninView() {
  const signin = useMutation(signinQuery, {}, {
    onComplete: completeSignin
  });
  const form = useForm(signin, () => ({}));

  return (<>
    <div style={{ textAlign: 'left' }}>
      <Form form={form} actions='submit' submitText="Войти" submitIcon={null}>
        <div>
          <TextField comp={form} name="login" validate={validateLogin}
            label="Адрес электронной почты" style={{ width: '100%' }}
          />
        </div>
        <div>
          <TextField comp={form} name="password" validate={validatePassword}
            type="password" label="Пароль" style={{ width: '100%' }}
          />
        </div>
      </Form>
    </div>
  </>);
}

export default React.memo(SigninView);