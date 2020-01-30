import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@kemsu/inputs';

function validateCourseGradeType(value) {
  if (!value) return 'Необходимо выбрать шкалу оценивания';
}

function CourseGradeTypeSelect({ form, ...props }) {
  
  return <Select comp={form} name="data.gradeType" label="Шкала оценивания" validate={validateCourseGradeType} {...props}>
    <MenuItem value="SCORE">Баллы</MenuItem>
    <MenuItem value="LETTER">Отл/Хор/Уд/Неуд</MenuItem>
    <MenuItem value="PASS/FAIL">Зачет/Незачет</MenuItem>
  </Select>;
}

export default React.memo(CourseGradeTypeSelect);