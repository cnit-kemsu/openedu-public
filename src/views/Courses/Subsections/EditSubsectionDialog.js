import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateSubsectionName } from '@lib/validate';
import { COURSE } from '../Sections';
import { SubsectionForm as useStyles } from './styles';

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
  refetch(COURSE);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function EditSubsectionDialog(close, { id, name, summary, sectionIndex }) {
  const updateSubsection = useMutation(UPDATE_SUBSECTION, { onComplete: () => onComplete(close) }, { id });
  const form = useForm(updateSubsection, { name, summary });

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование подраздела в разделе ${sectionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateSubsectionName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
}