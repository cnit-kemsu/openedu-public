import React, { useCallback } from 'react';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { History } from '@kemsu/router';
import { RouteNextBtn as useStyles } from './styles';

function RouteNextBtn({ path, ...props }) {
  const route = useCallback(() => History.push(path), [path]);

  const classes = useStyles();
  return <IconButton className={classes.root} onClick={route} {...props}>
    <ArrowForwardIcon />
  </IconButton>;
}

export default React.memo(RouteNextBtn);