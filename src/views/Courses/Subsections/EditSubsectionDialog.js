import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField, DaysTimeField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateSubsectionName, validateDelayAccessTime, validateAccessTimeLimit } from '@lib/validate';
import { COURSE } from '../Sections';
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
function onComplete(closeDialog) {
  closeDialog();
  refetch(COURSE);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function EditSubsectionDialog(close, { id, item, sectionIndex }) {
  const updateSubsection = useMutation(UPDATE_SUBSECTION, { onComplete: () => onComplete(close) }, { id });
  const form = useForm(updateSubsection, item);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование подраздела в разделе ${sectionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateSubsectionName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    <DaysTimeField className={classes.delayAccessTime} name="delayAccessTime" label="Задержка доступа" validate={validateDelayAccessTime} />
    <DaysTimeField className={classes.accessTimeLimit} name="accessTimeLimit" label="Время доступа" validate={validateAccessTimeLimit} />
  </div>
  </FormDialog>;
}