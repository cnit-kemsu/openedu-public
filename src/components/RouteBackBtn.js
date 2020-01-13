import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { History } from '@kemsu/router';
import { RouteBackBtn as useStyles } from './styles';

function RouteBackBtn({ path, label, ...props }) {
  const route = useCallback(() => History.push(path), [path]);

  const classes = useStyles();
  return <div className={classes.root}>
    <IconButton className={classes.button} onClick={route} {...props}>
      <ArrowBackIcon />
    </IconButton>
    <Typography>{label}</Typography>
</div>;
}

export default React.memo(RouteBackBtn);