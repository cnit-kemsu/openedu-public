import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { setAuthHeader } from '../../client';
import { Router } from '@kemsu/router';

const signInQuery = `
  query signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      role
      verified
      bearer
    }
  }
`;

const validEmail = /\S+@\S+\.\S+/;
function validateEmail(value) {
  if (!value) return 'Необходимо указать адрес электронной почты';
  if (!validEmail.test(value)) return 'Указан неверный адрес электронной почты';
  return undefined;
}
function validatePassword(value) {
  if (!value) return 'Необходимо ввести пароль';
  return undefined;
}

function completeSignIn({ signIn: { role, verified, bearer } }, { email }) {
  localStorage.setItem('role', role);
  localStorage.setItem('email', email);
  localStorage.setItem('verified', verified);
  localStorage.setItem('bearer', bearer);
  setAuthHeader(bearer);
  Router.push('/');
}

function SignIn() {
  const signIn = useMutation(signInQuery, {}, {
    onComplete: completeSignIn
  });
  const form = useForm(signIn, () => ({}));

  console.log('render SignIn');

  return (<>
    <div style={{ textAlign: 'left' }}>
      <Form form={form} actions='submit' submitText="Войти" submitIcon={null}>
        <div>
          <TextField comp={form} name="email" validate={validateEmail}
            label="Адрес электронной почты" style={{ width: '100%' }}
          />
        </div>
        <div>
          <TextField comp={form} name="password" validate={validatePassword}
            type="password" label="Пароль" style={{ width: '100%' }}
          />
        </div>
        <div>johncooper87@mail.ru</div>
      </Form>
    </div>
  </>);
}

export default React.memo(SignIn);