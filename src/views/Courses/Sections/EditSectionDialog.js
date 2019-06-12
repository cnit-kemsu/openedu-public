import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateSectionName } from '@lib/validate';
import { COURSE } from './';
import { SectionForm as useStyles } from './styles';

const UPDATE_SECTION = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateSection(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete(closeDialog) {
  closeDialog();
  refetch(COURSE);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function EditSectionDialog(close, { id, item }) {
  const updateSection = useMutation(UPDATE_SECTION, { onComplete: () => onComplete(close) }, { id });
  const form = useForm(updateSection, item);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Редактирование раздела" {...updateSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateSectionName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    </div>
  </FormDialog>;
}