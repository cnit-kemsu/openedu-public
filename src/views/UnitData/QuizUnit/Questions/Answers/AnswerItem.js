import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import MoreIconButton from '@components/MoreIconButton';
import { useArrayElement } from '@kemsu/form';
import { RadioButton } from '@kemsu/inputs';
import { Editor } from '@kemsu/editor';
import RightAnswerCheckbox from './RightAnswerCheckbox';
import { AnswerItem as useStyles, RightAnswerRadioButton as useRightAnswerRadioButtonStyles } from './styles';

export default function AnswerItem({ element, type, answerMenu, questionIndex }) {
  const { index, values, onChange } = useArrayElement(element);

  const classes = useStyles();
  const rightAnswerRadioButtonClasses = useRightAnswerRadioButtonStyles();
  const answerIndex = Number(index) + 1;
  return <ListItem className={classes.root}>
    <div className={classes.pre}>

      <Typography className={classes.index}>{answerIndex}.</Typography>

      {type === 'MultipleChoice' && <ListItemIcon>
        <RightAnswerCheckbox comp={element} />
      </ListItemIcon>}

      {type === 'SingleChoice' && <ListItemIcon><RadioButton classes={rightAnswerRadioButtonClasses} comp={element} value={index} /></ListItemIcon>}

    </div>
    <ListItemText className={classes.text} primary={<Editor editorState={values.content} readOnly={true} />} />
    <ListItemSecondaryAction>
      <MoreIconButton data-control onClick={event => answerMenu.open(event, { element, values, onChange, questionIndex, answerIndex })} />
    </ListItemSecondaryAction>
  </ListItem>;
};

//export default React.memo(AnswerItem);