import React from 'react';
import Paper from '@material-ui/core/Paper';
import { TextField, Editor } from '@kemsu/inputs';
import { TextUnitForm as useStyles } from './styles';

function DocumentUnit() {

  const classes = useStyles();
  return <Paper className={classes.root}>
    {/* <TextField className={classes.text} name="data.text" label="Текст" multiline rows={10} /> */}
    <Editor className={classes.text} name="data" label="Содержание" />
  </Paper>;
}
export default React.memo(DocumentUnit);