import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField, DaysTimeField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import { validateSubsectionName } from '@lib/validate';
import { COURSE } from '../Sections';
import { SubsectionForm as useStyles } from './styles';

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
  refetch(COURSE);
  Notifications.push('Подраздел был успешно создан.', 'success');
}

export default function CreateSubsectionDialog(close, { sectionId, sectionIndex }) {
  const createSubsection = useMutation(CREATE_SUBSECTION, { onComplete: () => onComplete(close) }, { sectionId });
  const form = useForm(createSubsection);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Новый подраздел в разделе ${sectionIndex}`} {...createSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateSubsectionName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
}