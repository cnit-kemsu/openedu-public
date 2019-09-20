import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField, DateTimePicker } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import {
  validateSubsectionName,
  validateAccessPeriod,
  validateExpirationPeriod,
  validateSubsectionAccessDate,
  validateSubsectionExpirationDate,
  validateCourseDeliverySubsectionForm
} from '@lib/validate';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '..';
import { SubsectionForm as useStyles } from './styles';

const CREATE_SUBSECTION_DESIGN = ({
  sectionId = 'Int!',
  name = 'String!',
  summary = 'String',
  accessPeriod = 'Int',
  expirationPeriod = 'Int'
}) => `
  createCourseDesignSubsection(
    sectionId: ${sectionId}
    name: ${name}
    summary: ${summary}
    accessPeriod: ${accessPeriod}
    expirationPeriod: ${expirationPeriod}
  )
`;

const CREATE_SUBSECTION_DELIVERY = ({
  sectionId = 'Int!',
  name = 'String!',
  summary = 'String',
  accessDate = 'String',
  expirationDate = 'String'
}) => `
  createCourseDeliverySubsection(
    sectionId: ${sectionId}
    name: ${name}
    summary: ${summary}
    accessDate: ${accessDate}
    expirationDate: ${expirationDate}
  )
`;

function onComplete(closeDialog, isDelivery) {
  closeDialog();
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Подраздел был успешно создан.', 'success');
}

export default function CreateSubsectionDialog(close, { sectionId, sectionIndex, isDelivery }) {
  const CREATE_MUTATION = isDelivery ? CREATE_SUBSECTION_DELIVERY : CREATE_SUBSECTION_DESIGN;
  const createSubsection = useMutation(CREATE_MUTATION, { onComplete: () => onComplete(close, isDelivery) }, { sectionId });
  const form = useForm(createSubsection, null, isDelivery ? validateCourseDeliverySubsectionForm : null);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Новый подраздел в разделе ${sectionIndex}`} {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateSubsectionName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
      {isDelivery
        ? <>
          <DateTimePicker className={classes.accessDate} name="accessDate" label="Дата открытия доступа" validate={validateSubsectionAccessDate} />
          <DateTimePicker className={classes.expirationDate} name="expirationDate" label="Дата закрытия доступа" validate={validateSubsectionExpirationDate} />
        </>
        : <>
          <TextField type="number" className={classes.accessPeriod} name="accessPeriod" label="Период открытия доступа (Дни)" validate={validateAccessPeriod} />
          <TextField type="number" className={classes.expirationPeriod} name="expirationPeriod" label="Период закрытия доступа (Дни)" validate={validateExpirationPeriod} />
        </>
      }
    </div>
  </FormDialog>;
}