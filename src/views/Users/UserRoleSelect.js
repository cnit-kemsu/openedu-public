import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@kemsu/inputs';

export function validateRole(value) {
  if (!value) return 'Необходимо указать роль';
}

function UserRoleSelect({ form, ...props }) {
  
  return <Select comp={form} name="role" validate={validateRole} label="Роль" {...props}>
    <MenuItem value="ADMIN">Администратор</MenuItem>
    <MenuItem value="INSTRUCTOR">Преподаватель</MenuItem>
  </Select>;
}

export default React.memo(UserRoleSelect);