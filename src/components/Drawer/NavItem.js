import React, { useCallback, useMemo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { History, useRoute } from '@kemsu/router';
import { NavItem as useStyles } from './styles';

function NavItem({ name, ...props }) {
  const path = (() => '/admin/' + name) |> useMemo(#, []);
  const route = (() => new RegExp(path)) |> useMemo(#, []);
  const navigate = (() => History.push(path)) |> useCallback(#, []);
  const selected = useRoute(route, true) || false;

  const classes = useStyles();
  return <ListItem TouchRippleProps={{ classes: { root: classes.touchRipple } }} 
    classes={{ button: classes.root, selected: classes.selected }}
    button selected={selected} onClick={navigate} {...props}
  />;
}

export default React.memo(NavItem);