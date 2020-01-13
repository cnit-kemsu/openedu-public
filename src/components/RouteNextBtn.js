import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { History } from '@kemsu/router';
import { RouteNextBtn as useStyles } from './styles';

function RouteNextBtn({ path, label, ...props }) {
  const route = useCallback(() => History.push(path), [path]);

  const classes = useStyles();
  return <div className={classes.root}>
    <Typography>{label}</Typography>
    <IconButton className={classes.button} onClick={route} {...props}>
      <ArrowForwardIcon />
    </IconButton>
  </div>;
}

export default React.memo(RouteNextBtn);