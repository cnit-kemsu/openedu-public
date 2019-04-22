import React from 'react';
import { PageNotFound as useStyles } from './styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function PageNotFound() {

  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>

      <Typography variant="h4">404</Typography>
      <Typography variant="h6">Страница не найдена</Typography>

    </Paper>
  </div>;
}

export default React.memo(PageNotFound);