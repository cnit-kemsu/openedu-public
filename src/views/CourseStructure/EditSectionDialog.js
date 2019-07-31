import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateSectionName } from '@lib/validate';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from './';
import { SectionForm as useStyles } from './styles';

const UPDATE_SECTION_DESIGN = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateSectionDesign(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;

const UPDATE_SECTION_DELIVERY = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateSectionDelivery(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;

function onComplete(closeDialog, isDelivery) {
  closeDialog();
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Раздел был успешно изменен.', 'success');
}

export default function EditSectionDialog(close, { id, item, isDelivery }) {
  const UPDATE_MUTATION = isDelivery ? UPDATE_SECTION_DELIVERY : UPDATE_SECTION_DESIGN;
  const updateSection = useMutation(UPDATE_MUTATION, { onComplete: () => onComplete(close, isDelivery) }, { id });
  const form = useForm(updateSection, item);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Редактирование раздела" {...updateSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateSectionName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    </div>
  </FormDialog>;
}