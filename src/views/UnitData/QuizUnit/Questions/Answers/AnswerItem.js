import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import MoreIconButton from '@components/MoreIconButton';
import { useArrayElement } from '@kemsu/form';
import { Editor } from '@kemsu/editor';
import RightAnserCheckbox from './RightAnswerCheckbox';
import { AnswerItem as useStyles } from './styles';

export function AnswerItem(element, { answerMenu, questionIndex }) {
  const { index, values, onChange } = useArrayElement(element);

  const classes = useStyles();
  const answerIndex = Number(index) + 1;
  return <ListItem className={classes.root}>
    <div className={classes.pre}>
      <Typography className={classes.index}>{answerIndex}.</Typography>
      <ListItemIcon>
        <RightAnserCheckbox comp={element} />
      </ListItemIcon>
    </div>
    {/* <ListItemText className={classes.text} primary={values.text} /> */}
    <ListItemText className={classes.text} primary={<Editor editorState={values.content} readOnly={true} />} />
    <ListItemSecondaryAction>
      <MoreIconButton data-control onClick={event => answerMenu.open(event, { element, values, onChange, questionIndex, answerIndex })} />
    </ListItemSecondaryAction>
  </ListItem>;
}