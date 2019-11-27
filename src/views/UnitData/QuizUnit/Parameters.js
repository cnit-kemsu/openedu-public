import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TextField, Checkbox } from '@kemsu/inputs';
import { Parameters as useStyles } from './styles';

function validateTotalAttempts(value) {
  //const _value = Number(value);
  if (!value) return 'Необходимо указать не нулевое значение';
  if (value % 1 !== 0) return 'Необходимо указать целое число';
  if (value < 0) return 'Значение должно быть положительным числом';
}
function validateTimeLimit(value) {
  //const _value = Number(value);
  //if (!_value) return 'Необходимо указать не нулевое значение';
  if (value && value % 1 !== 0) return 'Необходимо указать целое число';
  if (value < 0) return 'Значение должно быть положительным числом';
}
function validateMaxScore(value) {
  //const _value = Number(value);
  if (!value) return 'Необходимо указать не нулевое значение';
  if (value % 1 !== 0) return 'Необходимо указать целое число';
  if (value < 0) return 'Значение должно быть положительным числом';
}

function Parameters() {

  const classes = useStyles();
  return <Paper className={classes.root}>
    <Typography variant="h6">Параметры</Typography>
    <TextField className={classes.totalAttempts} name="data.totalAttempts" validate={validateTotalAttempts} label="Количество попыток" type="number" />
    <TextField className={classes.timeLimit} name="data.timeLimit" validate={validateTimeLimit} label="Ограничение по времени (в минутах)" type="number" />
    <TextField className={classes.maxScore} name="data.maxScore" validate={validateMaxScore} label="Максимальное количество баллов" type="number" />
    <div>
      <Checkbox color="primary" name="data.finalCertification" />
      <Typography className={classes.finalCertificationLabel}>Включить в итоговую аттестацию</Typography>
    </div>
  </Paper>;
}
export default React.memo(Parameters);