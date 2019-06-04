import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import updateSubmitProps from '@components/updateSubmitProps';
import { validateBlockName } from '@lib/validate';
import { COURSE } from '../Sections';
import { BlockForm as useStyles } from './styles';

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
  refetch(COURSE);
  Notifications.push('Блок был успешно изменен.', 'success');
}

export default function EditBlockDialog(close, { id, name, summary, subsectionIndex }) {
  const updateBlock = useMutation(UPDATE_BLOCK, { onComplete: () => onComplete(close) }, { id });
  const form = useForm(updateBlock, null, () => ({ name, summary }));

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование блока в подразделе ${subsectionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateBlockName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
  </div>
  </FormDialog>;
}