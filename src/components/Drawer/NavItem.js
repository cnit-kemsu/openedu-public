import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { NavItem as useStyles } from './styles';

function NavItem(props) {

  const classes = useStyles();
  return <ListItem TouchRippleProps={{ classes: { root: classes.touchRipple } }} 
    classes={{ button: classes.root, selected: classes.selected }}
    button {...props}
  />;
}

export default React.memo(NavItem);