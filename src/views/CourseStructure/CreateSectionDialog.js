import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import { validateSectionName } from '@lib/validate';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from './';
import { SectionForm as useStyles } from './styles';

const CREATE_SECTION_DESIGN = ({
  _courseId = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  createSectionDesign(
    courseId: ${_courseId}
    name: ${name}
    summary: ${summary}
  )
`;

const CREATE_SECTION_DELIVERY = ({
  _courseId = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  createSectionDelivery(
    courseId: ${_courseId}
    name: ${name}
    summary: ${summary}
  )
`;

function onComplete(closeDialog, isDelivery) {
  closeDialog();
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Раздел был успешно создан.', 'success');
}

export default function CreateSectionDialog(close, { _courseId, isDelivery }) {
  const CREATE_MUTATION = isDelivery ? CREATE_SECTION_DELIVERY : CREATE_SECTION_DESIGN;
  const createSection = useMutation(CREATE_MUTATION, { onComplete: () => onComplete(close, isDelivery) }, { _courseId });
  const form = useForm(createSection);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Новый раздел" {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateSectionName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    </div>
  </FormDialog>;
}