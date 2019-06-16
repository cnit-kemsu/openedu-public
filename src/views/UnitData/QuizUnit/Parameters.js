import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@kemsu/inputs';
import { Parameters as useStyles } from './styles';

function validateTotalAttempts(value) {
  const _value = Number(value);
  if (!_value) return 'Необходимо указать не нулевое значение';
  if (_value < 0) return 'Значение должно быть положительным числом';
}
function validateTimeLimit(value) {
  const _value = Number(value);
  if (!_value) return 'Необходимо указать не нулевое значение';
  if (_value < 0) return 'Значение должно быть положительным числом';
}
function validateMasxScore(value) {
  const _value = Number(value);
  if (!_value) return 'Необходимо указать не нулевое значение';
  if (_value < 0) return 'Значение должно быть положительным числом';
}

function Parameters() {

  const classes = useStyles();
  return <Paper className={classes.root}>
    <Typography variant="h6">Параметры</Typography>
    <TextField className={classes.totalAttempts} name="data.totalAttempts" validate={validateTotalAttempts} label="Количество попыток" type="number" />
    <TextField className={classes.timeLimit} name="data.timeLimit" validate={validateTimeLimit} label="Ограничение по времени (в минутах)" type="number" />
    <TextField className={classes.maxScore} name="data.maxScore" validate={validateMasxScore} label="Максимальное количество баллов" type="number" />
  </Paper>;
}
export default React.memo(Parameters);