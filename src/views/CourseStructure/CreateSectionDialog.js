import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import { validateSectionName } from '@lib/validate';
import { COURSE, COURSE_RELEASE } from './';
import { SectionForm as useStyles } from './styles';

const CREATE_SECTION = ({
  _courseId = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  createSection(
    courseId: ${_courseId}
    name: ${name}
    summary: ${summary}
  )
`;

const CREATE_SECTION_RELEASE = ({
  _courseId = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  createSectionRelease(
    courseId: ${_courseId}
    name: ${name}
    summary: ${summary}
  )
`;

function onComplete(closeDialog, release) {
  closeDialog();
  refetch(release ? COURSE_RELEASE : COURSE);
  Notifications.push('Раздел был успешно создан.', 'success');
}

export default function CreateSectionDialog(close, { _courseId, release }) {
  const CREATE_MUTATION = release ? CREATE_SECTION_RELEASE : CREATE_SECTION;
  const createSection = useMutation(CREATE_MUTATION, { onComplete: () => onComplete(close, release) }, { _courseId });
  const form = useForm(createSection);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Новый раздел" {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateSectionName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    </div>
  </FormDialog>;
}