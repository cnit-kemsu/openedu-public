import { GraphqlClient } from '@kemsu/graphql-client';

export const client = new GraphqlClient('/api');
const _bearer = localStorage.getItem('bearer');

if (_bearer !== undefined) client.headers = {
  'x-access-token': _bearer
};

export function setAuthToken({ id, role, email, verified, bearer }) {
  localStorage.setItem('id', id);
  localStorage.setItem('role', role);
  localStorage.setItem('email', email);
  localStorage.setItem('verified', verified);
  localStorage.setItem('bearer', bearer);
  client.headers = {
    'x-access-token': bearer
  };
}