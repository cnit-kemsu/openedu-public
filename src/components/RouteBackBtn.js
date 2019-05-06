import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { History } from '@kemsu/router';
import { RouteBackBtn as useStyles } from './styles';

function RouteBackBtn({ path }) {
  const route = useCallback(() => History.push(path), []);

  const classes = useStyles();
  return <Button size="small" variant="outlined" className={classes.root} onClick={route}>
    <ArrowBackIcon />
    Назад
  </Button>;
}

export default React.memo(RouteBackBtn);