import React from 'react';
import { Chip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { UserStatus as useStyles, StatusChip as useChipStyles } from './styles';

function UserStatus({ role, verified }) {
  const [color, roleName] = role === 'ADMIN'
  ? ['secondary', 'администратор']
  : ['primary', 'преподаватель'];
  const [backgroundColor, icon, accountStatus] = verified
  ? [green[600], <DoneIcon />, 'подтвержден']
  : [amber[700], <WarningIcon />, 'не подтвержден'];

  const classes = useStyles();
  const chipClasses = useChipStyles();
  return <ListItemText className={classes.root}>
    <Chip classes={chipClasses} color={color} label={roleName} />
    <Chip classes={chipClasses} icon={icon} style={{ backgroundColor }} label={accountStatus} />
  </ListItemText>;
}
export default React.memo(UserStatus);