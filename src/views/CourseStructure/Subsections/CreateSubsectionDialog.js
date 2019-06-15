import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField, DaysTimeField, DateTimePicker } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import {
  validateSubsectionName,
  validateDelayAccessTime,
  validateAccessTimeLimit,
  validateSubsectionStartDate,
  validateSubsectionEndDate,
  validateSubsectionReleaseForm
} from '@lib/validate';
import { COURSE, COURSE_RELEASE } from '..';
import { SubsectionForm as useStyles } from './styles';

const CREATE_SUBSECTION = ({
  sectionId = 'Int!',
  name = 'String!',
  summary = 'String',
  delayAccessTime = 'String!',
  accessTimeLimit = 'String!'
}) => `
  createSubsection(
    sectionId: ${sectionId}
    name: ${name}
    summary: ${summary}
    delayAccessTime: ${delayAccessTime}
    accessTimeLimit: ${accessTimeLimit}
  )
`;

const CREATE_SUBSECTION_RELEASE = ({
  sectionId = 'Int!',
  name = 'String!',
  summary = 'String',
  startDate = 'String!',
  endDate = 'String!'
}) => `
  createSubsectionRelease(
    sectionId: ${sectionId}
    name: ${name}
    summary: ${summary}
    startDate: ${startDate}
    endDate: ${endDate}
  )
`;

function onComplete(closeDialog, release) {
  closeDialog();
  refetch(release ? COURSE_RELEASE : COURSE);
  Notifications.push('Подраздел был успешно создан.', 'success');
}



export default function CreateSubsectionDialog(close, { sectionId, sectionIndex, release }) {
  const CREATE_MUTATION = release ? CREATE_SUBSECTION_RELEASE : CREATE_SUBSECTION;
  const createSubsection = useMutation(CREATE_MUTATION, { onComplete: () => onComplete(close, release) }, { sectionId });
  const form = useForm(createSubsection, null, release ? validateSubsectionReleaseForm : null);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Новый подраздел в разделе ${sectionIndex}`} {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateSubsectionName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
      {release
        ? <>
          <DateTimePicker className={classes.startDate} name="startDate" label="Дата начала" validate={validateSubsectionStartDate} />
          <DateTimePicker className={classes.endDate} name="endDate" label="Дата окончания" validate={validateSubsectionEndDate} />
        </>
        : <>
          <DaysTimeField className={classes.delayAccessTime} name="delayAccessTime" label="Задержка доступа" validate={validateDelayAccessTime} />
          <DaysTimeField className={classes.accessTimeLimit} name="accessTimeLimit" label="Время доступа" validate={validateAccessTimeLimit} />
        </>
      }
    </div>
  </FormDialog>;
}