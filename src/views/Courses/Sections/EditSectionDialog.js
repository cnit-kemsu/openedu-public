import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateSectionName } from '@lib/validate';
import { SectionForm as useStyles } from './styles';
import { SECTIONS } from './Sections';

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
  refetch(SECTIONS);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function CreateSectionDialog (close, { id, name, summary }) {
  const updateSection = useMutation(UPDATE_SECTION, { onComplete: () => onComplete(close) }, { id });
  const form = useForm(updateSection, null, () => ({ name, summary }));

  const classes = useStyles();
  return <FormDialog form={form} onClose={close} title="Редактирование раздела" {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} comp={form} name="name" validate={validateSectionName} label="Название"/>
    <TextField className={classes.summary} comp={form} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
};