import React from 'react';
import ReactDOM from 'react-dom';
import { GraphqlClient, GraphqlProvider, useQuery, useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Paper, Form } from '@kemsu/core';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core/styles";

const client = new GraphqlClient('/api');
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
  if (!value) return 'Необходимо указать имя пользователя или адрес электронной почты';
  return undefined;
}
function validatePassword(value) {
  if (!value) return 'Необходимо ввести пароль';
  return undefined;
}

function SigninView() {
  const signin = useMutation(signinQuery);
  const form = useForm(signin, () => ({}));

  return (<>
    <Paper style={{ width: '600px' }}>
      <Form form={form} title="Войти" actions='submit' submitText="Войти" submitIcon={null}>
        <div>
        <TextField comp={form} name="login" validate={validateLogin}
          label="Имя пользователя / Адрес электронной почты" style={{ width: '500px' }}
        />
        </div>
        <div>
        <TextField comp={form} name="password" validate={validatePassword}
          label="Пароль" style={{ width: '500px' }}
        />
        </div>
      </Form>
    </Paper>
    
  </>);
}

const usersQuery = `
  query users($limit: Int!) {
    users(limit: $limit) {
      id
      verified
      email
      username
    }
  }
`;

function Users() {

  console.log('render Users');
  const [data, , loading, ] = useQuery(usersQuery, { limit: 10 }, {
    onComplete: () => console.log('fetch users success'),
    onError: console.error
  });

  return (<>
    {loading ? 'loading...' : (
      data.users?.map(
        ({ id, username, verified, email }) => <div key={id}>
          <div>id: {id}</div>
          <div>email: {email}</div>
          <div>verified: {verified}</div>
          <div>username: {username}</div>
        </div>
      )
    )}
  </>);
}

const theme = createMuiTheme({});

function App() {

  console.log('render App');

  return (
    <ThemeProvider theme={theme}>
      <GraphqlProvider client={client}>
        <SigninView />
      </GraphqlProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);