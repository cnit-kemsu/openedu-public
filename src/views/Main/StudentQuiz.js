import React, { useState, useMemo } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery, refetch, useMutation } from '@kemsu/graphql-client';
import { Loader, Link, useElementArray, List } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { useArrayElement, useFieldArray, useForm, Fields } from '@kemsu/form';
import { AnswerItem1 as useAnswerItemStyles, Answers1 as useAnswersStyles, QuestionItem1 as useQuestionItemStyles, RightAnswerCheckbox as useRightAnswerCheckboxStyles } from './styles';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import Tooltip from '@material-ui/core/Tooltip';
import { Checkbox } from '@kemsu/inputs';

function RightAnswerCheckbox(props) {

  const classes = useRightAnswerCheckboxStyles();
  return <Tooltip title="Отметить как верный">
    <span>
      <Checkbox name="markAsCorrect" classes={classes} {...props} color="primary" />
    </span>
  </Tooltip>;
}

const keyProp = ({ key }) => key;

function AnswerItem(element, { questionIndex }) {
  const { index, values, onChange } = useArrayElement(element);
  const content = useMemo(() => values.content, []);
  values.content = undefined;
  const itemStyle = values.markedCorrectly !== undefined
    ? (values.markedCorrectly ? {
      backgroundColor: '#0903',
      border: '2px solid #0907',
      borderRadius: '4px'
    } : {
      backgroundColor: '#f003',
      border: '2px solid #f007',
      borderRadius: '4px'
    })
    : undefined;

  const classes = useAnswerItemStyles();
  const answerIndex = Number(index) + 1;
  return <ListItem className={classes.root} style={itemStyle}>
    <div className={classes.pre}>
      <Typography className={classes.index}>{answerIndex}.</Typography>
      <ListItemIcon>
        <RightAnswerCheckbox comp={element} />
      </ListItemIcon>
    </div>
    <ListItemText className={classes.text} primary={<Editor editorState={content} readOnly={true} />} />
  </ListItem>;
}

function Answers({ questionElement, questionIndex, ...props }) {
  const [answers, { push, error, dirty, touched, onBlur }] = useFieldArray(questionElement, 'answerOptions');
  const answerItems = useElementArray(AnswerItem, [...answers], { key: keyProp, memoize: false, questionIndex, ...props });
  const classes = useAnswersStyles();
  return <>
    <div onBlur={onBlur}>
      {answers.length > 0 && <List>
        {answerItems}
      </List>}
    </div>
  </>;
}

function QuestionItem(element, { ...props }) {
  const { index, values, onChange } = useArrayElement(element);
  const content = useMemo(() => values.content, []);
  values.content = undefined;

  const classes = useQuestionItemStyles();
  const questionIndex = Number(index) + 1;
  return <Paper className={classes.root}>
    <ListItem className={classes.item}>
      <div className={classes.pre}>
        <Typography className={classes.index}>{questionIndex}.</Typography>
      </div>
      <ListItemText className={classes.text} primary={<Editor editorState={content} readOnly={true} />} />
    </ListItem>
    <Divider />
    <Answers questionElement={element} questionIndex={questionIndex} {...props} />
  </Paper>;
}

function Questions({ ...props }) {
  const [questions, { push, error, dirty, touched, onBlur }] = useFieldArray(null, 'result.questions');
  const questionItems = useElementArray(QuestionItem, [...questions], { key: keyProp, memoize: false, ...props });

  return <>
    <div onBlur={onBlur}>
      {questions.length > 0 && <List>
        {questionItems}
      </List>}
    </div>
  </>;
}

export const UNIT_DELIVERY = ({ id = 'Int!' }) => `
  unitDelivery(id: ${id}) {
    id
    name
    type
    data
  }
`;

const START_QUIZ_ATTEMPT = ({ id = 'Int!' }) => `
  startQuizAttempt(courseDeliveryUnitId: ${id})
`;

const MAKE_QUIZ_ATTEMPT = ({ id = 'Int!', result = 'JSON' }) => `
  makeQuizAttempt(courseDeliveryUnitId: ${id} result: ${result})
`;


function StudentQuiz({ id }) {
  
  const [{ unitDelivery }, loading, errors] = useQuery(UNIT_DELIVERY, { id });
  const startQuizAttempt = useMutation(START_QUIZ_ATTEMPT, { onComplete: () => { refetch(UNIT_DELIVERY); } }, { id });
  const makeQuizAttempt = useMutation(MAKE_QUIZ_ATTEMPT, { onComplete: () => { refetch(UNIT_DELIVERY); } }, { id });

  const form = useForm(makeQuizAttempt, { result: { ...unitDelivery?.data } });

  return <Loader loading={loading} errors={errors}>
    {unitDelivery && <div>

      {!unitDelivery.data.questions && <Button onClick={() => startQuizAttempt()}>Начать тестирование</Button>}
      {unitDelivery.data.questions &&
        <Fields comp={form}>
          <Questions  />
          <UpdateFab {...{ loading, errors }} />
        </Fields>
        
      }

    </div>}
  </Loader>;
}

export default React.memo(StudentQuiz);