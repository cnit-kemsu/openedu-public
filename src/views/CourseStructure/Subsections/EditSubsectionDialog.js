import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField, DaysTimeField, DateTimePicker } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
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

const UPDATE_SUBSECTION = ({
  id = 'Int!',
  name = 'String',
  summary = 'String',
  delayAccessTime = 'String',
  accessTimeLimit = 'String'
}) => `
  updateSubsection(
    id: ${id}
    name: ${name}
    summary: ${summary}
    delayAccessTime: ${delayAccessTime}
    accessTimeLimit: ${accessTimeLimit}
  )
`;

const UPDATE_SUBSECTION_RELEASE = ({
  id = 'Int!',
  name = 'String',
  summary = 'String',
  startDate = 'String',
  endDate = 'String'
}) => `
  updateSubsectionRelease(
    id: ${id}
    name: ${name}
    summary: ${summary}
    startDate: ${startDate}
    endDate: ${endDate}
  )
`;

function onComplete(closeDialog, release) {
  closeDialog();
  refetch(release ? COURSE_RELEASE : COURSE);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function EditSubsectionDialog(close, { id, item, sectionIndex, release }) {
  const UPDATE_MUTATION = release ? UPDATE_SUBSECTION_RELEASE : UPDATE_SUBSECTION;
  const updateSubsection = useMutation(UPDATE_MUTATION, { onComplete: () => onComplete(close, release) }, { id });
  const form = useForm(updateSubsection, item, release ? validateSubsectionReleaseForm : null);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование подраздела в разделе ${sectionIndex}`} {...updateSubmitProps}>
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