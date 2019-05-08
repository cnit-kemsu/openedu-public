import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { NotAuthorizedPage as useStyles } from './styles';

function NotAuthorizedPage() {

  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography variant="h6">У вас нет прав для просмотра этой страницы</Typography>
    </Paper>
  </div>;
}
NotAuthorizedPage = React.memo(NotAuthorizedPage);

export default <NotAuthorizedPage />;