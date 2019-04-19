import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { Router } from '@kemsu/router';
import { setAuthToken } from '../client';

const createStudentMutation = `
  mutation createStudent($email: String!, $password: String!) {
    createStudent(email: $email, password: $password) {
      id
      role
      email
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
function validateConfirmPassword(value) {
  if (!value) return 'Необходимо подтвердить пароль';
  return undefined;
}
const PASSWORDS_MISMATCH = 'Пароли должны совпадать';
function validateForm({ password, confirmPassword }) {
  if (password && confirmPassword) if (password !== confirmPassword) {
    return {
      password: PASSWORDS_MISMATCH,
      confirmPassword: PASSWORDS_MISMATCH
    };
  }
  return undefined;
}

function completeRegistration({ createStudent }) {
  setAuthToken(createStudent);
  Router.push({ pathname: '/verify' });
}

function RegisterView() {
  const createStudent = useMutation(createStudentMutation, {}, {
    onComplete: completeRegistration
  });
  const form = useForm(createStudent, () => ({}), validateForm);

  return (<>
  <div style={{ textAlign: 'left', width: '600px' }}>
      <Form form={form} actions='submit' submitText="Зарегистрироваться" submitIcon={null}>
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
        <div>
          <TextField comp={form} name="confirmPassword" validate={validateConfirmPassword}
            type="password" label="Повторите пароль" style={{ width: '100%' }}
          />
        </div>
      </Form>
    </div>
  </>);
}

export default React.memo(RegisterView);