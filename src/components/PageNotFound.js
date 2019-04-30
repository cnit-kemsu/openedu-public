import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PageNotFound as useStyles } from './styles';

function PageNotFound() {

  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography variant="h4">404</Typography>
      <Typography variant="h6">Страница не найдена</Typography>
    </Paper>
  </div>;
}
PageNotFound = React.memo(PageNotFound);

export default <PageNotFound />;