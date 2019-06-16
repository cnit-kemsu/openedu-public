import React, { useCallback } from 'react';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { History } from '@kemsu/router';
import { RouteBackBtn as useStyles } from './styles';

function RouteBackBtn({ path }) {
  const route = useCallback(() => History.push(path), [path]);

  const classes = useStyles();
  // return <Button size="small" variant="outlined" className={classes.root} onClick={route}>
  //   <ArrowBackIcon />
  //   Назад
  // </Button>;
  return <IconButton className={classes.root} onClick={route}>
    <ArrowBackIcon />
  </IconButton>;
}

export default React.memo(RouteBackBtn);