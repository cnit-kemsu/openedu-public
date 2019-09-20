import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateUnitName } from '@lib/validate';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '../..';
import { UnitForm as useStyles } from './styles';

const UPDATE_UNIT_DESIGN = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateCourseDesignUnit(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;

const UPDATE_UNIT_DELIVERY = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateCourseDeliveryUnit(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;

function onComplete(closeDialog, isDelivery) {
  closeDialog();
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Блок был успешно изменен.', 'success');
}

export default function EditUnitDialog(close, { id, item, subsectionIndex, isDelivery }) {
  const UPDATE_MUTATION = isDelivery ? UPDATE_UNIT_DELIVERY : UPDATE_UNIT_DESIGN;
  const updateUnit = useMutation(UPDATE_MUTATION, { onComplete: () => onComplete(close, isDelivery) }, { id });
  const form = useForm(updateUnit, item);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование блока в подразделе ${subsectionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateUnitName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
}