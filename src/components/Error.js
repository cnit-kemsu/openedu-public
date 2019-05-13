import React from 'react';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import { Error as useStyles } from './styles';

function Error() {

  const classes = useStyles();
  return <Typography className={classes.root} color="error" variant="h6">
    <CancelIcon className={classes.icon} />
    Ошибка
  </Typography>;
}

export default React.memo(Error);