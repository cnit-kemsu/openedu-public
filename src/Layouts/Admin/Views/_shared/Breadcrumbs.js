import React from 'react';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { Breadcrumbs as useStyles } from './styles';

function Breadcrumbs({ children }) {

  const classes = useStyles();
  return <div>
    <MuiBreadcrumbs className={classes.root}>
      {children}
    </MuiBreadcrumbs>
  </div>;
}

export default React.memo(Breadcrumbs);