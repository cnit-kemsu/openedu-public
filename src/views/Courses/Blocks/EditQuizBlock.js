import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import { useFieldArray, useField } from '@kemsu/form';
import { useForceUpdate } from '@kemsu/force-update';
import { useDialog, useMenu, DialogModal, MenuModal } from '@kemsu/core';
import { EditQuizBlock as useStyles, Question as useQuestionStyles } from './styles';
import { CreateQuestionDialog, EditQuestionDialog, ConfirmDeleteQuestionDialog, QuestionContextMenu } from './Question';

function validateQuestion(value) {
  if (value?.length < 1) return [undefined, 'Необходимо добавить хотя бы один вопрос'];
  return undefined;
}

function Question({ element, menu }) {
  const { value, onChange } = useField(element.composer, 'text', null, _val => _val);
  const forceUpdate = useForceUpdate();
 
  const classes = useQuestionStyles();
  return <Paper className={classes.root}>
    <ListItem>
      <ListItemText primary={value} secondary="asd" />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => menu.open(event, { element, value, onChange, forceUpdate })} />
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    <div>
      123
    </div>
  </Paper>;
}
Question = React.memo(Question);

function EditQuizBlock({ form }) {

  const createDialog = useDialog();
  const editDialog = useDialog();
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ editDialog, confirmDeleteDialog });

  const renderQuestion = useCallback(
    element => <Question key={element.key} element={element} menu={menu} />,
    []
  );

  const classes = useStyles();
  const [{ map, push }, { error, dirty, touched, onBlur }] = useFieldArray(form, 'questions', validateQuestion);

  return <div>

    <div onBlur={onBlur}>
      <div>
        {map(renderQuestion)}
      </div>
      {error && <div style={touched && dirty ? { color: 'red' } : {}}>{error}</div>}
      <div className={classes.addQuestionButtonContainer}>
        <Button size="small" variant="contained" color="primary" className={classes.addQuestionButtonButton} onClick={() => createDialog.open({ push })}>
          <AddIcon />
          Добавить вопрос
        </Button>
      </div>
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

  </div>;
}
export default React.memo(EditQuizBlock);