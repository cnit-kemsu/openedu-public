import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation, useQuery } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { TextField, DateTimePicker } from '@kemsu/inputs';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
import { CourseReleaseForm as useStyles } from './styles';

function validateCourseName(value) {
  if (!value) return 'Необходимо указать название';
}
function validateStartDate(value) {
  if (!value) return 'Необходимо выбрать дату';
}
function validateEnrollmentEndDate(value) {
  if (!value) return 'Необходимо выбрать дату';
}

function EditCourseRelease() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    <DateTimePicker className={classes.startDate} name="startDate" validate={validateStartDate} label="Дата начала прохождения" />
    <DateTimePicker className={classes.enrollmentEndDate} name="enrollmentEndDate" validate={validateEnrollmentEndDate} label="Дата окончания регистрации" />
  </div>;
}
EditCourseRelease = React.memo(EditCourseRelease);

const UPDATE_COURSE_RELEASE = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String',
  startDate = 'String!',
  enrollmentEndDate = 'String!'
}) => `
  updateCourseRelease(
    id: ${id}
    name: ${name}
    summary: ${summary}
    startDate: ${startDate}
    enrollmentEndDate: ${enrollmentEndDate}
  )
`;
function onComplete() {
  History.push('/admin/releases');
  Notifications.push('Выпуск был успешно обновлен.', 'success');
}

export const COURSE_RELEASE = ({ id = 'Int!' }) => `
  courseRelease(id: ${id}) {
    name
    summary
    startDate
    enrollmentEndDate
  }
`;

export default (
  ({ id }) => {
    const [{ courseRelease }, loading, errors] = useQuery(COURSE_RELEASE, { id });
    const updateCourseRelease = useMutation(UPDATE_COURSE_RELEASE, { onComplete }, { id });
    const form = useForm(updateCourseRelease, courseRelease);

    return <Fields comp={form}>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path="/admin/releases" />
          <Typography variant="h6">Редактирование выпуска: {courseRelease?.name}</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/releases">Выпуски</Link>
        <Typography color="textPrimary">Изменить</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <Loader loading={loading} errors={errors}>
          {courseRelease && <EditCourseRelease />}
        </Loader>
      </AdminView.Paper>
      <AdminView.Div>
        <FormErrors />
      </AdminView.Div>
      <UpdateFab {...{ loading, errors }} />
    </Fields>;
  }
) |> React.memo(#);