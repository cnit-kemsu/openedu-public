import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { Router } from '@kemsu/router';
import { setAuthHeader } from '../../client';
import { UserInfo } from '../../classes/UserInfo';
import { validateEmail, validatePassword, validateConfirmPassword, validateFirstname, validateLastname } from '../_shared/validate';
import { CreateAccount as useStyles } from './styles';
const createStudentMutation = `
  mutation createStudent(
    $email: String!,
    $password: String!,
    $firstname: String!,
    $lastname: String!
  ) {
    createStudent(
      email: $email, 
      password: $password, 
      firstname: $firstname, 
      lastname: $lastname
    )
  }
`;
function onComplete({ createStudent: bearer }, { email }) {
  UserInfo.update({ role: 'student', email, verified: false, complete: true, bearer });
  setAuthHeader(bearer);
  Router.push('/account/verify');
}

function CreateAccount() {
  const createStudent = useMutation(createStudentMutation, { onComplete });
  const form = useForm(createStudent, validateConfirmPassword);

  const classes = useStyles();
  return <Form form={form} actions='submit' submitText="Создать аккаунт" submitIcon={null}>
    <TextField comp={form} name="email" validate={validateEmail}
      label="Адрес электронной почты" className={classes.email}
    />
    <TextField comp={form} name="password" validate={validatePassword}
      type="password" label="Пароль" className={classes.password}
    />
    <TextField comp={form} name="confirmPassword"
      type="password" label="Повторите пароль" className={classes.confirmPassword}
    />
    <TextField comp={form} name="firstname" validate={validateFirstname}
      label="Имя" className={classes.firstname}
    />
    <TextField comp={form} name="lastname" validate={validateLastname}
      label="Фамилия" className={classes.lastname}
    />
  </Form>;
}

export default React.memo(CreateAccount);