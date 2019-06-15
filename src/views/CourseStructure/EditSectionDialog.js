import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateSectionName } from '@lib/validate';
import { COURSE, COURSE_RELEASE } from './';
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

const UPDATE_SECTION_RELEASE = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateSectionRelease(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;

function onComplete(closeDialog, release) {
  closeDialog();
  refetch(release ? COURSE_RELEASE : COURSE);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function EditSectionDialog(close, { id, item, release }) {
  const UPDATE_MUTATION = release ? UPDATE_SECTION_RELEASE : UPDATE_SECTION;
  const updateSection = useMutation(UPDATE_MUTATION, { onComplete: () => onComplete(close, release) }, { id });
  const form = useForm(updateSection, item);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Редактирование раздела" {...updateSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateSectionName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    </div>
  </FormDialog>;
}