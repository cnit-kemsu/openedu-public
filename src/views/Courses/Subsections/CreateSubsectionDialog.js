import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import { validateSectionName } from '@lib/validate';
import { SubsectionForm as useStyles } from './styles';
import { SECTIONS } from '../Sections';

const CREATE_SUBSECTION = ({
  sectionId = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  createSubsection(
    sectionId: ${sectionId}
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete(closeDialog) {
  closeDialog();
  refetch(SECTIONS);
  Notifications.push('Подраздел был успешно создан.', 'success');
}

export default function CreateSectionDialog (close, { sectionId, sectionName }) {
  const createSubsection = useMutation(CREATE_SUBSECTION, { onComplete: () => onComplete(close) }, { sectionId });
  const form = useForm(createSubsection);

  const classes = useStyles();
  return <FormDialog form={form} onClose={close} title={`Новый подраздел раздела: ${sectionName}`} {...createSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} comp={form} name="name" validate={validateSectionName} label="Название"/>
    <TextField className={classes.summary} comp={form} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
};