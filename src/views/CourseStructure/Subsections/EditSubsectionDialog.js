import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField, DateTimePicker } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
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

const UPDATE_SUBSECTION_DESIGN = ({
  id = 'Int!',
  name = 'String',
  summary = 'String',
  accessPeriod = 'Int',
  expirationPeriod = 'Int'
}) => `
  updateCourseDesignSubsection(
    id: ${id}
    name: ${name}
    summary: ${summary}
    accessPeriod: ${accessPeriod}
    expirationPeriod: ${expirationPeriod}
  )
`;

const UPDATE_SUBSECTION_DELIVERY = ({
  id = 'Int!',
  name = 'String',
  summary = 'String',
  accessDate = 'String',
  expirationDate = 'String'
}) => `
  updateCourseDeliverySubsection(
    id: ${id}
    name: ${name}
    summary: ${summary}
    accessDate: ${accessDate}
    expirationDate: ${expirationDate}
  )
`;

function onComplete(closeDialog, isDelivery) {
  closeDialog();
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function EditSubsectionDialog(close, { id, item, sectionIndex, isDelivery }) {
  const UPDATE_MUTATION = isDelivery ? UPDATE_SUBSECTION_DELIVERY : UPDATE_SUBSECTION_DESIGN;
  const updateSubsection = useMutation(UPDATE_MUTATION, { onComplete: () => onComplete(close, isDelivery) }, { id });
  const form = useForm(updateSubsection, item, isDelivery ? validateCourseDeliverySubsectionForm : null);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование подраздела в разделе ${sectionIndex}`} {...updateSubmitProps}>
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