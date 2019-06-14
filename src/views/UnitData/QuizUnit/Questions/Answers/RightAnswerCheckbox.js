import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Checkbox } from '@kemsu/inputs';
import { RightAnswerCheckbox as useStyles } from './styles';

function RightAnswerCheckbox(props) {

  const classes = useStyles();
  return <Tooltip title="Отметить как верный">
    <span>
      <Checkbox name="correct" classes={classes} {...props} color="default" />
    </span>
  </Tooltip>;
}

export default React.memo(RightAnswerCheckbox);