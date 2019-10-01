import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@kemsu/inputs';

export function validateUnitType(value) {
  if (!value) return 'Необходимо указать тип';
}

function UnitTypeSelect({ form, ...props }) {
  
  return <Select comp={form} name="type" validate={validateUnitType} label="Тип" {...props}>
    <MenuItem value="DOCUMENT">Документ</MenuItem>
    <MenuItem value="FILE_DOCUMENT">Файл-документ</MenuItem>
    <MenuItem value="VIDEO">Видео</MenuItem>
    <MenuItem value="QUIZ">Тест</MenuItem>
  </Select>;
}

export default React.memo(UnitTypeSelect);