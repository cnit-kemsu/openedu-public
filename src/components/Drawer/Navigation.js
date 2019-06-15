import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import NavItem from './NavItem';

function Navigation() {
  return <List>
    <NavItem name="users">
      <ListItemText primary="Пользователи" />
    </NavItem>
    <NavItem name="courses">
      <ListItemText primary="Курсы" />
    </NavItem>
    <NavItem name="releases">
      <ListItemText primary="Выпуски" />
    </NavItem>
  </List>;
}

export default React.memo(Navigation);