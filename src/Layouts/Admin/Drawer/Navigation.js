import React, { useMemo, useCallback } from 'react';
import { History, useRoute } from '@kemsu/router';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import NavItem from './NavItem';

function renderNavItem(navigate, selected, children) {
  return <NavItem onClick={navigate} selected={selected}>
    {children}
  </NavItem>;
}
function useNavItem(selected, route, children) {
  const navigate = useCallback(
    () => History.push('/admin/' + route),
    [route]
  );
  return (() => renderNavItem(navigate, selected === route, children))
  |> useMemo(#);
}

const currentRoute = /^\/admin\/(?<selected>users|courses)\/?/;

function Navigation() {
  const { selected } = useRoute(currentRoute) || {};
  return <List>
    {useNavItem(selected, 'users', <ListItemText primary="Пользователи" />)}
    {useNavItem(selected, 'courses', <ListItemText primary="Курсы" />)}
  </List>;
}

export default React.memo(Navigation);