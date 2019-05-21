import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateSectionName } from '@lib/validate';
import { SubsectionForm as useStyles } from './styles';
import { SECTIONS } from '../Sections';

const UPDATE_SUBSECTION = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateSubsection(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete(closeDialog) {
  closeDialog();
  refetch(SECTIONS);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function CreateSubsectionDialog (close, { id, name, summary }) {
  const updateSubsection = useMutation(UPDATE_SUBSECTION, { onComplete: () => onComplete(close) }, { id });
  const form = useForm(updateSubsection, null, () => ({ name, summary }));

  const classes = useStyles();
  return <FormDialog form={form} onClose={close} title="Редактирование подраздела" {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} comp={form} name="name" validate={validateSectionName} label="Название"/>
    <TextField className={classes.summary} comp={form} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
};