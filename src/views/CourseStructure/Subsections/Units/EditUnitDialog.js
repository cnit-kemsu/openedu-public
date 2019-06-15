import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateUnitName } from '@lib/validate';
import { COURSE } from '../..';
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
function onComplete(closeDialog) {
  closeDialog();
  refetch(COURSE);
  Notifications.push('Блок был успешно изменен.', 'success');
}

export default function EditUnitDialog(close, { id, item, subsectionIndex }) {
  const updateUnit = useMutation(UPDATE_UNIT, { onComplete: () => onComplete(close) }, { id });
  const form = useForm(updateUnit, item);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование блока в подразделе ${subsectionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateUnitName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
}