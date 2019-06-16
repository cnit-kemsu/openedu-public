import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateUnitName } from '@lib/validate';
import { COURSE, COURSE_RELEASE } from '../..';
import { UnitForm as useStyles } from './styles';

const UPDATE_UNIT = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateUnit(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;

const UPDATE_UNIT_RELEASE = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateUnitRelease(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;

function onComplete(closeDialog, release) {
  closeDialog();
  refetch(release ? COURSE_RELEASE : COURSE);
  Notifications.push('Блок был успешно изменен.', 'success');
}

export default function EditUnitDialog(close, { id, item, subsectionIndex, release }) {
  const UPDATE_MUTATION = release ? UPDATE_UNIT_RELEASE : UPDATE_UNIT;
  const updateUnit = useMutation(UPDATE_MUTATION, { onComplete: () => onComplete(close, release) }, { id });
  const form = useForm(updateUnit, item);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование блока в подразделе ${subsectionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateUnitName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
}