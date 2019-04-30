import { GraphqlClient } from '@kemsu/graphql-client';
import { UserInfo } from './lib/UserInfo';

export const client = new GraphqlClient('/api');

export function setAuthHeader(bearer) {
  if (bearer) client.headers = {
    'x-access-token': bearer
  };
}

setAuthHeader(UserInfo.bearer);