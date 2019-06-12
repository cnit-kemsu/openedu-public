import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import { useFieldArray, useField } from '@kemsu/form';
import { useDialog, useMenu, DialogModal, MenuModal, List, useElementArray } from '@kemsu/core';
import { EditQuizBlock as useStyles, Question as useQuestionStyles, Answer as useAnswerStyles } from './styles';
import { CreateQuestionDialog, EditQuestionDialog, ConfirmDeleteQuestionDialog, QuestionContextMenu } from './Question';
import { CreateAnswerDialog, EditAnswerDialog, ConfirmDeleteAnswerDialog, AnswerContextMenu } from './Answer';

function validateQuestion(value) {
  if (value === undefined || value?.length < 1) return [undefined, 'Необходимо добавить хотя бы один вопрос'];
  return undefined;
}

function validateAnswers(value) {
  if (value === undefined || value?.length < 1) return [undefined, 'Необходимо добавить хотя бы один ответ'];
  return undefined;
}

function AnswerItem (element, { menu }) {
  const { value, onChange } = useField(element.composer, 'text', null, _val => _val);

  const classes = useAnswerStyles();
  return <ListItem>
    <ListItemText primary={value} />
    <ListItemSecondaryAction>
      <MoreIconButton onClick={event => menu.open(event, { element, value, onChange })} />
    </ListItemSecondaryAction>
  </ListItem>;
}

function QuestionItem (element, { menu, createAnswerDialog, answersMenu }) {
  const { value, onChange } = useField(element.composer, 'text', null, _val => _val);

  const [{ push, elements, length }, { error, dirty, touched, onBlur }] = useFieldArray(element.composer, 'answers', validateAnswers);
  const answerItems = useElementArray(AnswerItem, [...elements], { key: _element => _element.key, menu: answersMenu });

  const classes = useQuestionStyles();
  return <Paper className={classes.root}>
    <ListItem>
      <ListItemText primary={value} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => menu.open(event, { element, value, onChange })} />
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    <div>
      <div onBlur={onBlur}>
        {length > 0 && <List>
          {answerItems}
        </List>}
      </div>
      {(error && touched && dirty) && <Typography color="error">{error}</Typography>}
      <div className={length > 0 ? classes.addAnswerButtonContainer : classes.addAnswerButtonContainerAlone}>
        <Button size="small" variant="outlined" color="primary" className={classes.addAnswerButtonButton} onClick={() => createAnswerDialog.open({ push })}>
          <AddIcon />
          Добавить ответ
        </Button>
      </div>
    </div>
  </Paper>;
}

function EditQuizBlock({ form }) {

  const createDialog = useDialog();
  const editDialog = useDialog();
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ editDialog, confirmDeleteDialog });

  const createAnswerDialog = useDialog();
  const editAnswerDialog = useDialog();
  const confirmDeleteAnswerDialog = useDialog();
  const answersMenu = useMenu({ editDialog: editAnswerDialog, confirmDeleteDialog: confirmDeleteAnswerDialog });

  const [{ push, elements, length }, { error, dirty, touched, onBlur }] = useFieldArray(form, 'data.questions', validateQuestion);
  const questionItems = useElementArray(QuestionItem, [...elements], { key: element => element.key, menu, createAnswerDialog, answersMenu });

  const classes = useStyles();
  return <div className={classes.root}>

    <div onBlur={onBlur}>
      {length > 0 && <List>
        {questionItems}
      </List>}
    </div>
    {(error && touched && dirty) && <Typography color="error">{error}</Typography>}
    <div className={length > 0 ? classes.addQuestionButtonContainer : classes.addQuestionButtonContainerAlone}>
      <Button size="small" variant="contained" color="primary" className={classes.addQuestionButtonButton} onClick={() => createDialog.open({ push })}>
        <AddIcon />
        Добавить вопрос
      </Button>
    </div>

    <MenuModal mgr={menu}>
      {QuestionContextMenu}
    </MenuModal>

    <DialogModal mgr={createDialog}>
      {CreateQuestionDialog}
    </DialogModal>

    <DialogModal mgr={editDialog}>
      {EditQuestionDialog}
    </DialogModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteQuestionDialog}
    </DialogModal>

    <MenuModal mgr={answersMenu}>
      {AnswerContextMenu}
    </MenuModal>

    <DialogModal mgr={createAnswerDialog}>
      {CreateAnswerDialog}
    </DialogModal>

    <DialogModal mgr={editAnswerDialog}>
      {EditAnswerDialog}
    </DialogModal>

    <DialogModal mgr={confirmDeleteAnswerDialog}>
      {ConfirmDeleteAnswerDialog}
    </DialogModal>

  </div>;
}
export default React.memo(EditQuizBlock);