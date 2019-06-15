import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { DateTimePicker } from '@kemsu/inputs';
import { Link, FormErrors, Notifications } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import CreateFab from '@components/CreateFab';
import ResetButton from '@components/ResetButton';
import { CourseReleaseForm as useStyles } from './styles';

function validateStartDate(value) {
  if (!value) return 'Необходимо выбрать дату';
  const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const nowDate = new Date() |> new Date(#.getFullYear(), #.getMonth(), #.getDate());
  if (date < nowDate) return 'Значение должно быть позже сегодняшней даты';
}
function validateEnrollmentEndDate(value) {
  if (!value) return 'Необходимо выбрать дату';
  const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const nowDate = new Date() |> new Date(#.getFullYear(), #.getMonth(), #.getDate());
  if (date < nowDate) return 'Значение должно быть позже сегодняшней даты';
}

function CreateCourseRelease() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <DateTimePicker className={classes.startDate} name="startDate" validate={validateStartDate} label="Дата начала прохождения" />
    <DateTimePicker className={classes.enrollmentEndDate} name="enrollmentEndDate" validate={validateEnrollmentEndDate} label="Дата окончания регистрации" />
  </div>;
}
CreateCourseRelease = React.memo(CreateCourseRelease);

const CREATE_COURSE_RELEASE = ({
  courseId = 'Int!',
  startDate = 'String!',
  enrollmentEndDate = 'String!'
}) => `
  createCourseRelease(
    courseId: ${courseId}
    startDate: ${startDate}
    enrollmentEndDate: ${enrollmentEndDate}
  )
`;
function onComplete() {
  History.push('/admin/courses');
  Notifications.push('Выпуск был успешно создан.', 'success');
}
export default (({ courseId }) => {
  const createCourseRelease = useMutation(CREATE_COURSE_RELEASE, { onComplete }, { courseId });
  const form = useForm(createCourseRelease);

  return <Fields comp={form}>
    <AdminView.AppBar>
      <AdminView.LeftBar>
        <RouteBackBtn path="/admin/courses" />
        <Typography variant="h6">Новый выпуск</Typography>
      </AdminView.LeftBar>
      <ResetButton />
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Link styled path="/admin/courses">Курсы</Link>
      <Typography color="textPrimary">Создать выпуск</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CreateCourseRelease />
    </AdminView.Paper>
    <AdminView.Div>
      <FormErrors />
    </AdminView.Div>
    <CreateFab />
  </Fields>;
}
) |> React.memo(#);