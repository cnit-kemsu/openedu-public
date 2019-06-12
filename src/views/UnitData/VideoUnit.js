import React from 'react';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@kemsu/inputs';
import { VideoUnitForm as useStyles } from './styles';

function VideoUnit() {

  const classes = useStyles();
  return <Paper className={classes.root}>
    <TextField className={classes.video} name="data.url" label="URL видео" />
  </Paper>;
}
export default React.memo(VideoUnit);