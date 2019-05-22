import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@kemsu/inputs';

export function validateBlockType(value) {
  if (!value) return 'Необходимо указать тип';
}

function BlockTypeSelect({ form, ...props }) {
  
  return <Select comp={form} name="type" validate={validateBlockType} label="Тип" {...props}>
    <MenuItem value="TEXT">Текст</MenuItem>
    <MenuItem value="VIDEO">Видео</MenuItem>
    <MenuItem value="QUIZ">Тест</MenuItem>
  </Select>;
}

export default React.memo(BlockTypeSelect);