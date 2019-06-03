import React from 'react';
import { Mutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { History } from '@kemsu/router';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { setAuthHeader } from '@lib/client';
import { UserInfo } from '@lib/UserInfo';
import { validateFirstname, validateLastname } from '@lib/validate';
import { Complete as useStyles } from './styles';

const COMPLETE_ACCOUNT = ({
  firstname = 'String!',
  lastname = 'String!'
}) => `
  bearer: completeAccount(firstname: ${firstname}, lastname: ${lastname})
`;
function onComplete({ bearer }) {
  UserInfo.update({ complete: true, bearer });
  setAuthHeader(bearer);
  History.push('/');
}
const completeAccount = new Mutation(COMPLETE_ACCOUNT, { onComplete }).commit;

function ConfirmAccount() {
  const form = useForm(completeAccount);

  const classes = useStyles();
  return <Form comp={form} submitText="Закончить" submitIcon={null} resetText={null}>
    <TextField name="firstname" validate={validateFirstname}
      label="Имя" className={classes.firstname}
    />
    <TextField name="lastname" validate={validateLastname}
      label="Фамилия" className={classes.lastname}
    />
  </Form>;
}

export default React.memo(ConfirmAccount);