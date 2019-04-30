import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Logo as useStyles } from './styles';

function Logo({ className, classes, ...props }) {
  
  const _classes = useStyles();
  return <div className={_classes.root + ' ' + className} {...props}>
    <Typography variant="h4" className={_classes.logo + ' ' + classes?.logo}>
      1K
    </Typography>
    <Typography variant="h6" className={_classes.title + ' ' + classes?.title}>
      Открытое образование
    </Typography>
  </div>;
}

export default React.memo(Logo);