import React, { PureComponent, useRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery, refetch, useMutation } from '@kemsu/graphql-client';
import { Loader, useElementArray, List } from '@kemsu/core';
import { useForceUpdate } from '@kemsu/force-update';
import { Editor } from '@kemsu/editor';
import { useForm, Fields } from '@kemsu/form';
import { AnswerItem1 as useAnswerItemStyles, Answers1 as useAnswersStyles, QuestionItem1 as useQuestionItemStyles, RightAnswerCheckbox as useRightAnswerCheckboxStyles } from '../../styles';
import UpdateFab from '@components/UpdateFab';
import Tooltip from '@material-ui/core/Tooltip';
import { ArrayCheckbox } from '@kemsu/inputs';
import { UserInfo } from '@lib/UserInfo';
import { UNIT_DELIVERY } from './';

function RightAnswerCheckbox({ disabled, name, arrayValue }) {

  const classes = useRightAnswerCheckboxStyles();
  return <Tooltip title={disabled ? "" : "Отметить как верный"}>
    <span>
      <ArrayCheckbox arrayValue={arrayValue} disabled={disabled} name={'reply.' + name} classes={classes} color="primary" />
    </span>
  </Tooltip>;
}

function AnswerItem({ item: { content }, index, disabled, questionIndex, feedback }) {

  const markedCorrectly = feedback?.[index];
  const itemStyle = markedCorrectly != null
    ? (markedCorrectly ? {
      backgroundColor: '#0903',
      border: '2px solid #0907',
      borderRadius: '4px'
    } : {
      backgroundColor: '#f003',
      border: '2px solid #f007',
      borderRadius: '4px'
    })
    : undefined;

  // const _dis = React.useRef(false);
  // if (markedCorrectly === false) {
  //   _dis.current = true;
  // }
  // if (_dis.current) itemStyle = {
  //   backgroundColor: '#f003',
  //   border: '2px solid #f007',
  //   borderRadius: '4px'
  // };

  const classes = useAnswerItemStyles();
  const answerIndex = Number(index) + 1;
  return <ListItem className={classes.root} style={itemStyle}>
    <div className={classes.pre}>
      <Typography className={classes.index}>{answerIndex}.</Typography>
      <ListItemIcon>
        <RightAnswerCheckbox arrayValue={index} disabled={disabled || markedCorrectly != null} name={questionIndex} />
      </ListItemIcon>
    </div>
    <ListItemText className={classes.text} primary={<Editor editorState={content} readOnly={true} />} />
  </ListItem>;
}
QuestionItem = React.memo(QuestionItem);

function Answers({ answerOptions, questionIndex, feedback, disabled }) {
  
  //const classes = useAnswersStyles();
  return <>
    <div>
      {answerOptions.length > 0 && <List>
        {answerOptions.map((item, index) => <AnswerItem {...{ key: index, index, item, feedback, questionIndex, disabled }} />)}
      </List>}
    </div>
  </>;
}
Answers = React.memo(Answers);

function QuestionItem({ item: { content, answerOptions }, index, disabled, feedback }) {

  const classes = useQuestionItemStyles();
  const _questionIndex = Number(index) + 1;
  return <Paper className={classes.root}>
    <ListItem className={classes.item}>
      <div className={classes.pre}>
        <Typography className={classes.index}>{_questionIndex}.</Typography>
      </div>
      <ListItemText className={classes.text} primary={<Editor editorState={content} readOnly={true} />} />
    </ListItem>
    <Divider />
    <Answers disabled={disabled} feedback={feedback?.[index]} answerOptions={answerOptions} questionIndex={index}  />
  </Paper>;
}
QuestionItem = React.memo(QuestionItem);

function Questions({ questions, disabled, feedback }) {

  return <div>
    {questions.length > 0 && <List>
      {questions.map((item, index) => <QuestionItem {...{ key: index, index, item, feedback, disabled }} />)}
    </List>}
  </div>;
}
Questions = React.memo(Questions);

const START_QUIZ_ATTEMPT = ({ id = 'Int!' }) => `
  createQuizAttempt(unitId: ${id})
`;

const MAKE_QUIZ_ATTEMPT = ({ id = 'Int!', reply = 'JSON' }) => `
  submitQuizReply(unitId: ${id} reply: ${reply})
`;

class Timer extends PureComponent {
  constructor(props) {
    super(props);

    const { timeLimit, started } = props;
    let elapsedTime = timeLimit * 60 - Math.floor((new Date() - started) / 1000);
    if (elapsedTime < 0) {
      elapsedTime = 0;
      this.shoudUpdate = false;
    } else this.shoudUpdate = true;

    this.state = {
      elapsedTime
    };
    this.makeTick = this.makeTick.bind(this);
  } 

  makeTick() {
    const { timeLimit, started, onTick } = this.props;
    if (this.shoudUpdate) {
      this.setState({
        elapsedTime: timeLimit * 60 - Math.floor((new Date() - started) / 1000)
      });
      if (this.state.elapsedTime > 0) setTimeout(this.makeTick, 1000);
      else onTick();
    }
  }

  componentDidMount() {
    setTimeout(this.makeTick, 1000);
  }

  componentWillUnmount() {
    this.shoudUpdate = false;
  }

  render() {
    const { elapsedTime } = this.state;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60 |> #.toString() |> ('0' + #).slice(-2);

    return elapsedTime > 0
      ? <Typography color={elapsedTime > 60 ? 'textPrimary' : 'error'}>Оставшееся время: {minutes}:{seconds}</Typography>
      : <Typography color="error">Время истекло</Typography>;
  }
}

function hasTime(timeLimit, started) {
  if (!timeLimit) return true;
  const elapsedTime = timeLimit * 60 - Math.floor((new Date() - new Date(started)) / 1000);
  if (elapsedTime > 0) return true;
  return false;
}

function filterReply(lastSubmittedReply, feedback) {
  if (!lastSubmittedReply) return [];

  if (!feedback) return lastSubmittedReply;

  const reply = [...lastSubmittedReply];
  for (const questionkIndex in lastSubmittedReply) {

    if (!feedback[questionkIndex]) continue;
    const questionFeedback = feedback[questionkIndex];
    if (questionFeedback instanceof Array) {
      for (const answerOptionIndex in questionFeedback) {
        const answerFeedback = questionFeedback[answerOptionIndex];
        if (answerFeedback === false) reply[questionkIndex] = reply[questionkIndex].filter(val => val !== Number(answerOptionIndex));
      }
    }
  }
  return reply;
}

const refetchUnitDelivery = () => refetch(UNIT_DELIVERY);

function QuizInfo({ id, timeLimit, totalAttempts, maxScore }) {
  const startQuizAttempt = useMutation(START_QUIZ_ATTEMPT, { onComplete: refetchUnitDelivery }, { id });

  return <div style={{ textAlign: 'center' }}>
    {timeLimit && <Typography>Время на выполнение: {timeLimit} мин</Typography>}
    <Typography style={{ marginBottom: '12px' }}>Число попыток: {totalAttempts}</Typography>
    <Typography>Максимальное количество баллов: {maxScore}</Typography>
    {timeLimit && <Typography>После нажатие кнопки, начнется отсчет времени</Typography>}
    <Button style={{ marginTop: '12px' }} variant="contained" color="primary" onClick={() => startQuizAttempt()}>Начать тестирование</Button>
  </div>;
}
QuizInfo = React.memo(QuizInfo);

function QuizState({ timeLimit, totalAttempts, maxScore, currentUserLastAttempt, forceUpdate }) {

  const { startDate, repliesCount, score } = currentUserLastAttempt || {};

  if (UserInfo.role === 'student') return <span>
    {timeLimit && currentUserLastAttempt != null && <Timer onTick={forceUpdate} started={startDate} timeLimit={timeLimit} />}
    <Typography>Число использованных попыток: {repliesCount || 0} из {totalAttempts}</Typography>
    {repliesCount >= totalAttempts && <Typography color="error">У вас закончились попытки</Typography>}
    <Typography>Количество баллов: {score || 0} из {maxScore}</Typography>
  </span>;

  return <span>
    {timeLimit && <Typography>Вермя на выполнение: {timeLimit} мин</Typography>}
    <Typography>Число попыток: {totalAttempts}</Typography>
    <Typography>Максимальное количество баллов: {maxScore}</Typography>
  </span>;
}
QuizState = React.memo(QuizState);

function Quiz({ id, data: { questions, timeLimit, totalAttempts, maxScore }, currentUserLastAttempt, loading, errors }) {
  
  if (UserInfo.role === 'student' && currentUserLastAttempt == null) return <QuizInfo {...{ id, timeLimit, totalAttempts, maxScore }} />;

  const forceUpdate = useForceUpdate();
  const makeQuizAttempt = useMutation(MAKE_QUIZ_ATTEMPT, { onComplete: refetchUnitDelivery }, { id });

  const form = useForm(makeQuizAttempt, { reply: filterReply(currentUserLastAttempt?.lastSubmittedReply, currentUserLastAttempt?.feedback) });

  //const hastTime = hasTime(timeLimit, currentUserLastAttempt?.startDate);
  //const hasAttempts = currentUserLastAttempt?.repliesCount < totalAttempts;
  const canSubmitQuizReply = UserInfo.role === 'student' && hasTime(timeLimit, currentUserLastAttempt?.startDate) && currentUserLastAttempt?.repliesCount < totalAttempts;
  //const disabled = (UserInfo.role !== 'student' && !(hastTime && hasAttempts)) || (currentUserLastAttempt?.score === maxScore);

  return <div>

    {questions &&
      <Fields comp={form}>

        <div style={{ padding: '16px', marginBottom: '24px' }}>
          <QuizState {...{ id, timeLimit, totalAttempts, maxScore, currentUserLastAttempt, forceUpdate }} />
        </div>

        <Questions questions={questions} feedback={currentUserLastAttempt?.feedback} disabled={!canSubmitQuizReply} />

        {canSubmitQuizReply && <UpdateFab {...{ loading, errors }}>Отправить результат</UpdateFab>}

      </Fields>
    }

  </div>;
}

export default React.memo(Quiz);