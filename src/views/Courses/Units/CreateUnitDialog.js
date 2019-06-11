import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import { validateUnitName } from '@lib/validate';
import { UnitForm as useStyles } from './styles';
import UnitTypeSelect from './UnitTypeSelect';
import { COURSE } from '../Sections';

const CREATE_UNIT = ({
  subsectionId = 'Int!',
  name = 'String!',
  summary = 'String',
  type = 'UnitTypeEnum!'
}) => `
  createUnit(
    subsectionId: ${subsectionId}
    name: ${name}
    summary: ${summary}
    type: ${type}
  )
`;
function onComplete(closeDialog) {
  closeDialog();
  refetch(COURSE);
  Notifications.push('Блок был успешно создан.', 'success');
}

export default function CreateUnitDialog(close, { subsectionId, subsectionIndex }) {
  const createUnit = useMutation(CREATE_UNIT, { onComplete: () => onComplete(close) }, { subsectionId });
  const form = useForm(createUnit);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Новый блок в подразделе ${subsectionIndex}`} {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateUnitName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
      <UnitTypeSelect className={classes.type} />
    </div>
  </FormDialog>;
}