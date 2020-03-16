import { GraphqlClient } from '@kemsu/graphql-client';

GraphqlClient.url = 
'/graphql';
//'/api' ;

function errorToJson(error) {
  return JSON.stringify(error, null, ' ').replace(/(\\{2})/g, '\\');
}

function logGraphqlError(error) {
  errorToJson(error)
  |> console.log('%c GraphqlError: ' + #, 'color: red');
}
GraphqlClient.onGraphqlErrors = errors => {
  errors?.forEach(logGraphqlError);
};

function logServerError(error) {
  errorToJson(error)
  |> console.log('%c ServerError: ' + #, 'color: red');
} 
GraphqlClient.onServerErrors = errors => {
  errors?.forEach(logServerError);
};

GraphqlClient.onError = error => {
  console.error(error);
};

export function setAuthHeader(bearer) {
  if (bearer) GraphqlClient.headers['x-access-token'] = bearer;
  else delete GraphqlClient.headers['x-access-token'];
}