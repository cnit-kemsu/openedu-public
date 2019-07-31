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

function EditCourseDeliveryInstance() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    <DateTimePicker className={classes.startDate} name="startDate" validate={validateStartDate} label="Дата начала" />
    <DateTimePicker className={classes.enrollmentEndDate} name="enrollmentEndDate" validate={validateEnrollmentEndDate} label="Дата окончания регистрации" />
  </div>;
}
EditCourseDeliveryInstance = React.memo(EditCourseDeliveryInstance);

const UPDATE_COURSE_DELIVERY_INSTANCE = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String',
  startDate = 'String!',
  enrollmentEndDate = 'String!'
}) => `
  updateCourseDeliveryInstance(
    id: ${id}
    name: ${name}
    summary: ${summary}
    startDate: ${startDate}
    enrollmentEndDate: ${enrollmentEndDate}
  )
`;
function onComplete() {
  History.push('/admin/course-delivery-instances');
  Notifications.push('Выпуск был успешно обновлен.', 'success');
}

export const COURSE_DELIVERY_INSTANCE = ({ id = 'Int!' }) => `
  courseDeliveryInstance(id: ${id}) {
    name
    summary
    startDate
    enrollmentEndDate
  }
`;

export default (
  ({ id }) => {
    const [{  courseDeliveryInstance }, loading, errors] = useQuery(COURSE_DELIVERY_INSTANCE, { id });
    const updateCourseDeliveryInstance = useMutation(UPDATE_COURSE_DELIVERY_INSTANCE, { onComplete }, { id });
    const form = useForm(updateCourseDeliveryInstance, courseDeliveryInstance);

    return <Fields comp={form}>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path="/admin/course-delivery-instances" />
          <Typography variant="h6">Редактирование экземпляра курса: {courseDeliveryInstance?.name}</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/course-delivery-instances">Реализация курсов</Link>
        <Typography color="textPrimary">Изменить экземпляр</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <Loader loading={loading} errors={errors}>
          {courseDeliveryInstance && <EditCourseDeliveryInstance />}
        </Loader>
      </AdminView.Paper>
      <AdminView.Div>
        <FormErrors />
      </AdminView.Div>
      <UpdateFab {...{ loading, errors }} />
    </Fields>;
  }
) |> React.memo(#);