import React from 'react';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Notifications, FormDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import { validateBlockName } from '@lib/validate';
import { BlockForm as useStyles } from './styles';
import BlockTypeSelect from './BlockTypeSelect';
import { COURSE } from '../Sections';

const CREATE_BLOCK = ({
  subsectionId = 'Int!',
  name = 'String!',
  summary = 'String',
  type = 'BlockTypeEnum!'
}) => `
  createBlock(
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

export default function CreateBlockDialog(close, { subsectionId, subsectionIndex }) {
  const createBlock = useMutation(CREATE_BLOCK, { onComplete: () => onComplete(close) }, { subsectionId });
  const form = useForm(createBlock);

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Новый блок в подразделе ${subsectionIndex}`} {...createSubmitProps}>
    <div className={classes.root}>
      <TextField className={classes.name} name="name" validate={validateBlockName} label="Название"/>
      <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
      <BlockTypeSelect className={classes.type} />
    </div>
  </FormDialog>;
}