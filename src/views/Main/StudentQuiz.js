import React, { useState, useMemo, PureComponent } from 'react';
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
import { useForceUpdate } from '@kemsu/force-update';
import { Editor } from '@kemsu/editor';
import { useArrayElement, useFieldArray, useForm, Fields } from '@kemsu/form';
import { AnswerItem1 as useAnswerItemStyles, Answers1 as useAnswersStyles, QuestionItem1 as useQuestionItemStyles, RightAnswerCheckbox as useRightAnswerCheckboxStyles } from './styles';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import Tooltip from '@material-ui/core/Tooltip';
import { Checkbox } from '@kemsu/inputs';
import { UserInfo } from '@lib/UserInfo';

function RightAnswerCheckbox({ disabled, ...props }) {

  const classes = useRightAnswerCheckboxStyles();
  return <Tooltip title={disabled ? "" : "Отметить как верный"}>
    <span>
      <Checkbox disabled={disabled} name="markAsCorrect" classes={classes} {...props} color="primary" />
    </span>
  </Tooltip>;
}

const keyProp = ({ key }) => key;

function AnswerItem(element, { disabled }) {
  const { index, values } = useArrayElement(element);
  const content = useMemo(() => values.content, []);
  values.content = undefined;
  let itemStyle = values.markedCorrectly !== undefined
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

  const _dis = React.useRef(false);
  if (values.markedCorrectly === false) {
    _dis.current = true;
    values.markAsCorrect = false;
  }
  if (_dis.current) itemStyle = {
    backgroundColor: '#f003',
    border: '2px solid #f007',
    borderRadius: '4px'
  };

  const classes = useAnswerItemStyles();
  const answerIndex = Number(index) + 1;
  return <ListItem className={classes.root} style={itemStyle}>
    <div className={classes.pre}>
      <Typography className={classes.index}>{answerIndex}.</Typography>
      <ListItemIcon>
        <RightAnswerCheckbox disabled={_dis.current || disabled || values.markedCorrectly} comp={element} />
      </ListItemIcon>
    </div>
    <ListItemText className={classes.text} primary={<Editor editorState={content} readOnly={true} />} />
  </ListItem>;
}

function Answers({ questionElement, questionIndex, disabled, ...props }) {
  const [answers] = useFieldArray(questionElement, 'answerOptions');
  const answerItems = useElementArray(AnswerItem, [...answers], { key: keyProp, memoize: false, questionIndex, disabled: disabled, ...props });
  //const classes = useAnswersStyles();
  return <>
    <div>
      {answers.length > 0 && <List>
        {answerItems}
      </List>}
    </div>
  </>;
}

function QuestionItem(element, { disabled, ...props }) {
  const { index, values } = useArrayElement(element);
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
    <Answers disabled={disabled} questionElement={element} questionIndex={questionIndex} {...props} />
  </Paper>;
}

function Questions({ disabled, ...props }) {
  const [questions] = useFieldArray(null, 'result.questions');
  const questionItems = useElementArray(QuestionItem, [...questions], { key: keyProp, memoize: false, disabled: disabled, ...props });

  return <>
    <div>
      {questions.length > 0 && <List>
        {questionItems}
      </List>}
    </div>
  </>;
}

export const UNIT_DELIVERY = ({ id = 'Int!' }) => `
  unitDelivery: courseDeliveryUnit(id: ${id}) {
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

class Timer extends PureComponent {
  constructor(props) {
    super(props);

    this.started = new Date(this.props.started);
    let elapsedTime = this.props.timeLimit * 60 - Math.floor((new Date() - this.started) / 1000);
    this.shoudUpdate = true;
    if (elapsedTime < 0) {
      elapsedTime = 0;
      this.shoudUpdate = false;
    }
    this.state = {
      elapsedTime
    };

    this.makeTick = this.makeTick.bind(this);
  } 

  makeTick() {
    if (this.shoudUpdate) {
      this.setState({
        elapsedTime: this.props.timeLimit * 60 - Math.floor((new Date() - this.started) / 1000)
      });
      if (this.state.elapsedTime > 0) setTimeout(this.makeTick, 1000);
      else this.props.updateParent();
    }
  }

  componentDidMount() {
    setTimeout(this.makeTick, 1000);
  }

  componentWillUnmount() {
    this.shoudUpdate = false;
  }

  render() {
    const minutes = Math.floor(this.state.elapsedTime / 60);
    const seconds = this.state.elapsedTime % 60 |> #.toString() |> ('0' + #).slice(-2);
    return this.state.elapsedTime > 0
      ? <Typography color={this.state.elapsedTime > 60 ? 'textPrimary' : 'error'}>Оставшееся время: {minutes}:{seconds}</Typography>
      : <Typography color="error">Время истекло</Typography>;
  }
}

function hasTime(timeLimit, started) {
  if (!timeLimit) return true;
  const elapsedTime = timeLimit * 60 - Math.floor((new Date() - new Date(started)) / 1000);
  if (elapsedTime > 0) return true;
  return false;
}

function StudentQuiz({ id }) {
  
  const forceUpdate = useForceUpdate();
  const [{ unitDelivery }, loading, errors] = useQuery(UNIT_DELIVERY, { id });
  const startQuizAttempt = useMutation(START_QUIZ_ATTEMPT, { onComplete: () => { refetch(UNIT_DELIVERY); } }, { id });
  const makeQuizAttempt = useMutation(MAKE_QUIZ_ATTEMPT, { onComplete: () => { refetch(UNIT_DELIVERY); } }, { id });

  const form = useForm(makeQuizAttempt, { result: { ...unitDelivery?.data } });

  const hastTime = unitDelivery ? hasTime(unitDelivery.data.timeLimit, unitDelivery.data.started) : false;
  const hasAttempts = unitDelivery ? unitDelivery.data.count < unitDelivery.data.totalAttempts : false;
  const disabled = UserInfo.role !== 'student' && !(hastTime && hasAttempts);
  return <Loader loading={loading} errors={errors}>
    {unitDelivery && <div>

      {!unitDelivery.data.questions && 
        <div style={{ textAlign: 'center' }}>
          {unitDelivery.data.timeLimit && <Typography>Вермя на выполнение: {unitDelivery.data.timeLimit} мин</Typography>}
          <Typography style={{ marginBottom: '12px' }}>Число попыток: {unitDelivery.data.totalAttempts}</Typography>
          <Typography>Максимальное количество баллов: {unitDelivery.data.maxScore}</Typography>
          {unitDelivery.data.timeLimit && <Typography>После нажатие кнопки, начнется отсчет времени</Typography>}
          <Button variant="contained" color="primary" onClick={() => startQuizAttempt()}>Начать тестирование</Button>
        </div>
      }
      {unitDelivery.data.questions &&
        <Fields comp={form}>
          <Paper style={{ padding: '16px', marginBottom: '24px' }}>
            {UserInfo.role === 'student' && <span>
              {unitDelivery.data.timeLimit && hasAttempts && <Timer updateParent={forceUpdate} started={unitDelivery.data.started} timeLimit={unitDelivery.data.timeLimit} />}
              <Typography>Число использованных попыток: {unitDelivery.data.count || 0} из {unitDelivery.data.totalAttempts}</Typography>
              {unitDelivery.data.count >= unitDelivery.data.totalAttempts && <Typography color="error">У вас закончились попытки</Typography>}
              <Typography>Количество баллов: {unitDelivery.data.score || 0} из {unitDelivery.data.maxScore}</Typography>
            </span>}
            {UserInfo.role !== 'student' && <span>
              {unitDelivery.data.timeLimit && <Typography>Вермя на выполнение: {unitDelivery.data.timeLimit} мин</Typography>}
              <Typography>Число попыток: {unitDelivery.data.totalAttempts}</Typography>
              <Typography>Максимальное количество баллов: {unitDelivery.data.maxScore}</Typography>
            </span>}
          </Paper>
          <Questions disabled={disabled} />
          {hasAttempts && hastTime && <UpdateFab {...{ loading, errors }}>Отправить результат</UpdateFab>}
        </Fields>
      }

    </div>}
  </Loader>;
}

export default React.memo(StudentQuiz);