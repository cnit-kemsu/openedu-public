import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import { validateUnitName } from '@lib/validate';
import { UnitForm as useStyles } from './styles';
import UnitTypeSelect from './UnitTypeSelect';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '../..';

const CREATE_UNIT_DESIGN = ({
  subsectionId = 'Int!',
  name = 'String!',
  summary = 'String',
  type = 'UnitTypeEnum!'
}) => `
  createCourseDesignUnit(
    subsectionId: ${subsectionId}
    name: ${name}
    summary: ${summary}
    type: ${type}
  )
`;

const CREATE_UNIT_DELIVERY = ({
  subsectionId = 'Int!',
  name = 'String!',
  summary = 'String',
  type = 'UnitTypeEnum!'
}) => `
  createCourseDeliveryUnit(
    subsectionId: ${subsectionId}
    name: ${name}
    summary: ${summary}
    type: ${type}
  )
`;

function onComplete(closeDialog, isDelivery) {
  closeDialog();
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Блок был успешно создан.', 'success');
}

export default function CreateUnitDialog(close, { subsectionId, subsectionIndex, isDelivery }) {
  //console.log('isDelivery', isDelivery);
  const CREATE_MUTATION = isDelivery ? CREATE_UNIT_DELIVERY : CREATE_UNIT_DESIGN;
  const createUnit = useMutation(CREATE_MUTATION, { onComplete: () => onComplete(close, isDelivery) }, { subsectionId });
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