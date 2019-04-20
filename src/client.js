import { GraphqlClient } from '@kemsu/graphql-client';

export const client = new GraphqlClient('/api');

export function setAuthHeader(bearer) {
  client.headers = {
    'x-access-token': bearer
  };
}

localStorage.getItem('bearer')
|> # !== undefined && setAuthHeader(#);