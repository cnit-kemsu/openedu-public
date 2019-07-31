import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import NavItem from './NavItem';

function Navigation() {
  return <List>
    <NavItem name="users">
      <ListItemText primary="Пользователи" />
    </NavItem>
    <NavItem name="course-design-templates">
      <ListItemText primary="Дизайн курсов" />
    </NavItem>
    <NavItem name="course-delivery-instances">
      <ListItemText primary="Реализация курсов" />
    </NavItem>
  </List>;
}

export default React.memo(Navigation);