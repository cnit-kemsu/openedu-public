import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateSectionName } from '@lib/validate';
import { BlockForm as useStyles } from './styles';
import { SECTIONS } from '../Sections';

const UPDATE_BLOCK = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateBlock(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete(closeDialog) {
  closeDialog();
  refetch(SECTIONS);
  Notifications.push('Блок был успешно изменен.', 'success');
}

export default function EditBlockDialog (close, { id, name, summary }) {
  const updateBlock = useMutation(UPDATE_BLOCK, { onComplete: () => onComplete(close) }, { id });
  const form = useForm(updateBlock, null, () => ({ name, summary }));

  const classes = useStyles();
  return <FormDialog form={form} onClose={close} title="Редактирование блока" {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} comp={form} name="name" validate={validateSectionName} label="Название"/>
    <TextField className={classes.summary} comp={form} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
}