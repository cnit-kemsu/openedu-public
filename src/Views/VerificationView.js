import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Form } from '@kemsu/core';
import { Router } from '@kemsu/router';

const verifyStudentMutation = `
  mutation verifyStudent($code: String!) {
    verifyStudent(code: $code) {
      id
      role
      email
      verified
      bearer
    }
  }
`;

function validateCode(value) {
  if (!value) return 'Необходимо ввести код подтверждения';
  return undefined;
}

function completeVerification() {
  localStorage.setItem('verified', true);
  Router.push({ pathname: '/' });
}

function VerificationView() {
  const verifyStudent = useMutation(verifyStudentMutation, {}, {
    onComplete: completeVerification
  });
  const form = useForm(verifyStudent, () => ({}));

  return (<>
    <div style={{ textAlign: 'left' }}>
      <Form form={form} actions='submit' submitText="Подтвердить" submitIcon={null}>
        <div>
          <TextField comp={form} name="code" validate={validateCode}
            label="Код подтверждения" style={{ width: '100%' }}
          />
        </div>
      </Form>
    </div>
  </>);
}

export default React.memo(VerificationView);