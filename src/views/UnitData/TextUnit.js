import React from 'react';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@kemsu/inputs';
import { TextUnitForm as useStyles } from './styles';

function TextUnit() {

  const classes = useStyles();
  return <Paper className={classes.root}>
    <TextField className={classes.text} name="data.text" label="Текст" multiline rows={10} />
  </Paper>;
}
export default React.memo(TextUnit);