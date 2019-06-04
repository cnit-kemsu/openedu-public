import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import { validateSectionName } from '@lib/validate';
import { COURSE } from './';
import { SectionForm as useStyles } from './styles';

const CREATE_SECTION = ({
  courseId = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  createSection(
    courseId: ${courseId}
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete(closeDialog) {
  closeDialog();
  refetch(COURSE);
  Notifications.push('Раздел был успешно создан.', 'success');
}

export default function CreateSectionDialog(close, { courseId }) {
  const createSection = useMutation(CREATE_SECTION, { onComplete: () => onComplete(close) }, { courseId });
  const form = useForm(createSection);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Новый раздел" {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateSectionName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    </div>
  </FormDialog>;
}