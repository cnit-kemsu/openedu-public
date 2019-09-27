import React, { PureComponent } from 'react';
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
import { AnswerItem1 as useAnswerItemStyles, Answers1 as useAnswersStyles, QuestionItem1 as useQuestionItemStyles, RightAnswerCheckbox as useRightAnswerCheckboxStyles } from './styles';
import UpdateFab from '@components/UpdateFab';
import Tooltip from '@material-ui/core/Tooltip';
import { ArrayCheckbox } from '@kemsu/inputs';
import { UserInfo } from '@lib/UserInfo';

function RightAnswerCheckbox({ disabled, name, arrayValue, ...props }) {

  const classes = useRightAnswerCheckboxStyles();
  return <Tooltip title={disabled ? "" : "Отметить как верный"}>
    <span>
      <ArrayCheckbox arrayValue={arrayValue} disabled={disabled} name={'reply.' + name} classes={classes} {...props} color="primary" />
    </span>
  </Tooltip>;
}

const keyProp = (item, index) => index;

function AnswerItem(element, { disabled, _questionIndex, feedback }) {

  const markedCorrectly = feedback?.[element.index];
  let itemStyle = markedCorrectly != null
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

  const _dis = React.useRef(false);
  if (markedCorrectly === false) {
    _dis.current = true;
  }
  if (_dis.current) itemStyle = {
    backgroundColor: '#f003',
    border: '2px solid #f007',
    borderRadius: '4px'
  };

  const classes = useAnswerItemStyles();
  const answerIndex = Number(element.index) + 1;
  return <ListItem className={classes.root} style={itemStyle}>
    <div className={classes.pre}>
      <Typography className={classes.index}>{answerIndex}.</Typography>
      <ListItemIcon>
        <RightAnswerCheckbox arrayValue={element.index} disabled={_dis.current || disabled || markedCorrectly} name={_questionIndex} />
      </ListItemIcon>
    </div>
    <ListItemText className={classes.text} primary={<Editor editorState={element.content} readOnly={true} />} />
  </ListItem>;
}

function Answers({ answerOptions, _questionIndex, feedback, disabled, ...props }) {
  const answerItems = useElementArray(AnswerItem, [...answerOptions], { key: keyProp, memoize: false, feedback, _questionIndex, disabled: disabled, ...props });
  
  //const classes = useAnswersStyles();
  return <>
    <div>
      {answerOptions.length > 0 && <List>
        {answerItems}
      </List>}
    </div>
  </>;
}

function QuestionItem(element, { disabled, feedback, ...props }) {

  const classes = useQuestionItemStyles();
  const questionIndex = Number(element.index) + 1;
  return <Paper className={classes.root}>
    <ListItem className={classes.item}>
      <div className={classes.pre}>
        <Typography className={classes.index}>{questionIndex}.</Typography>
      </div>
      <ListItemText className={classes.text} primary={<Editor editorState={element.content} readOnly={true} />} />
    </ListItem>
    <Divider />
    <Answers disabled={disabled} feedback={feedback?.[element.index]} answerOptions={element.answerOptions} _questionIndex={element.index} {...props} />
  </Paper>;
}

function Questions({ questions, disabled, feedback, ...props }) {
  const questionItems = useElementArray(QuestionItem, [...questions], { key: keyProp, memoize: false, feedback, disabled: disabled, ...props });

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
  },
  quizAttempt(unitId: ${id})
`;

const START_QUIZ_ATTEMPT = ({ id = 'Int!' }) => `
  createQuizAttempt(unitId: ${id})
`;

const MAKE_QUIZ_ATTEMPT = ({ id = 'Int!', reply = 'JSON' }) => `
  submitQuizReply(unitId: ${id} reply: ${reply})
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

function StudentQuiz({ id }) {
  
  const forceUpdate = useForceUpdate();
  const [{ unitDelivery, quizAttempt }, loading, errors] = useQuery(UNIT_DELIVERY, { id });
  const startQuizAttempt = useMutation(START_QUIZ_ATTEMPT, { onComplete: () => { refetch(UNIT_DELIVERY); } }, { id });
  const makeQuizAttempt = useMutation(MAKE_QUIZ_ATTEMPT, { onComplete: () => { refetch(UNIT_DELIVERY); } }, { id });

  const form = useForm(makeQuizAttempt, { reply: filterReply(quizAttempt?.lastSubmittedReply, quizAttempt?.feedback) });

  const hastTime = unitDelivery ? hasTime(unitDelivery.data.timeLimit, quizAttempt?.startDate) : false;
  const hasAttempts = unitDelivery ? quizAttempt?.repliesCount < unitDelivery.data.totalAttempts : false;
  const disabled = (UserInfo.role !== 'student' && !(hastTime && hasAttempts)) || (quizAttempt?.score === unitDelivery?.data?.maxScore);
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
              {unitDelivery.data.timeLimit && hasAttempts && <Timer updateParent={forceUpdate} started={quizAttempt?.startDate} timeLimit={unitDelivery.data.timeLimit} />}
              <Typography>Число использованных попыток: {quizAttempt?.repliesCount || 0} из {unitDelivery.data.totalAttempts}</Typography>
              {quizAttempt?.repliesCount >= unitDelivery.data.totalAttempts && <Typography color="error">У вас закончились попытки</Typography>}
              <Typography>Количество баллов: {quizAttempt?.score || 0} из {unitDelivery.data.maxScore}</Typography>
            </span>}
            {UserInfo.role !== 'student' && <span>
              {unitDelivery.data.timeLimit && <Typography>Вермя на выполнение: {unitDelivery.data.timeLimit} мин</Typography>}
              <Typography>Число попыток: {unitDelivery.data.totalAttempts}</Typography>
              <Typography>Максимальное количество баллов: {unitDelivery.data.maxScore}</Typography>
            </span>}
          </Paper>
          <Questions questions={unitDelivery?.data?.questions} feedback={quizAttempt?.feedback} disabled={disabled} />
          {hasAttempts && hastTime && !disabled && <UpdateFab {...{ loading, errors }}>Отправить результат</UpdateFab>}
        </Fields>
      }

    </div>}
  </Loader>;
}

export default React.memo(StudentQuiz);