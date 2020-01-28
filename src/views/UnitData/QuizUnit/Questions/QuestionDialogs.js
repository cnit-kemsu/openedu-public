import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useForm } from '@kemsu/form';
import { Editor, Select } from '@kemsu/inputs';
import { FormDialog, ConfirmDialog } from '@kemsu/core';
import createSubmitProps from '@components/createSubmitProps';
import updateSubmitProps from '@components/updateSubmitProps';
import confirmDeleteProps from '@components/confirmDeleteProps';
import MenuItem from '@material-ui/core/MenuItem';
import { QuestionForm as useStyles } from './styles';

export function validateQuestionType(value) {
  if (!value) return 'Необходимо указать тип';
}

function QuestionTypeSelect({ form, ...props }) {
  
  return <Select comp={form} name="type" validate={validateQuestionType} label="Тип ответа" {...props}>
    <MenuItem value="MultipleChoice">Множественный выбор</MenuItem>
    <MenuItem value="SingleChoice">Едиственный выбор</MenuItem>
  </Select>;
}

QuestionTypeSelect = React.memo(QuestionTypeSelect);

function validateText(value) {
  if (!value || (value.constructor.name === 'EditorState' && !value.getCurrentContent().hasText())) return 'Содержание вопроса не должен быть пустым';
}

export function CreateQuestionDialog(close, { push }) {
  const form = useForm((values) => push({ ...values, /*type: 'MultipleChoice'*/ }), null, null, { onSubmitted: close });

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title="Новый вопрос" {...createSubmitProps}>
    <div className={classes.root}>
      <Editor name="content" label="Содержание" validate={validateText} />
      <QuestionTypeSelect comp={form} className={classes.type} />
    </div>
  </FormDialog>;
}

function _onChange(newValues, oldValues, onChange) {
  if (newValues.type !== oldValues.type) {
    newValues.answerOptions = oldValues.answerOptions.map(({ content }) => ({ content }));
    delete oldValues.correctAnswerIndex;
  }
  onChange({ ...oldValues, ...newValues });
}

export function EditQuestionDialog(close, { values, onChange, questionIndex }) {
  const form = useForm((newValues) => _onChange(newValues, values, onChange), values, null, { onSubmitted: close });

  const classes = useStyles();
  return <FormDialog comp={form} onClose={close} title={`Редактирование вопроса №${questionIndex}`} {...updateSubmitProps}>
    <div className={classes.root}>
      <Editor name="content" label="Содержание" validate={validateText} />
      <QuestionTypeSelect comp={form} className={classes.type} />
    </div>
  </FormDialog>;
}

export function ConfirmDeleteQuestionDialog(close, { element, questionIndex }) {
  
  return <ConfirmDialog onClose={close} onConfirm={element.delete} title="Удаление вопроса" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить вопрос №{questionIndex}?
    </DialogContentText>
  </ConfirmDialog>;
}