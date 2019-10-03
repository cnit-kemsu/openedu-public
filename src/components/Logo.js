import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Logo as useStyles } from './styles';
import logImg from './logo.png';

// function Logo({ className, classes, ...props }) {
  
//   const _classes = useStyles();
//   return <div className={_classes.root + ' ' + className} {...props}>
//     <Typography variant="h4" className={_classes.logo + ' ' + classes?.logo}>
//       1K
//     </Typography>
//     <Typography variant="h6" className={_classes.title + ' ' + classes?.title}>
//       Открытое образование
//     </Typography>
//   </div>;
// }

const imgStyle = {
  //height: '64px',
  height: '100%',
  //marginTop: '6px',
  cursor: 'pointer'
};

const containerStyle = {
  height: '70px',
  paddingTop: '6px'
};

function Logo({ className, classes, ...props }) {
  
  //const _classes = useStyles();
  return <div style={containerStyle} {...props}>
    <img src={logImg} style={imgStyle} />
  </div>;
}

export default React.memo(Logo);