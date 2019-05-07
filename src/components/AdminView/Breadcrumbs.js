import React from 'react';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { Breadcrumbs as useStyles } from './styles';

function Breadcrumbs({ children }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <MuiBreadcrumbs className={classes.breadcrumbs}>
      {children}
    </MuiBreadcrumbs>
  </div>;
}

export default React.memo(Breadcrumbs);