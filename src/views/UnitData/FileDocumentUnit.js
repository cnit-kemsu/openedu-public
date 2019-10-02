import React from 'react';
import Paper from '@material-ui/core/Paper';
import { DragAndDropPDFDialog } from '@kemsu/inputs';
import { TextUnitForm as useStyles } from './styles';

function FileDocumentUnit() {

  const classes = useStyles();
  return <Paper className={classes.root}>
    {/* <TextField className={classes.text} name="data.text" label="Текст" multiline rows={10} /> */}
    <DragAndDropPDFDialog className={classes.text} name="data" label="Файл" />
  </Paper>;
}
export default React.memo(FileDocumentUnit);