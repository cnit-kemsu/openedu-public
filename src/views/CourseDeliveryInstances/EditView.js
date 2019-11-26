import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation, useQuery } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { TextField, DateTimePicker, Editor, DragAndDropImageDialog } from '@kemsu/inputs';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
import CourseGradeTypeSelect from '@views/_shared/CourseGradeTypeSelect';
import { CourseReleaseForm as useStyles } from './styles';
import Instructors from './Instructors';

function validateCourseName(value) {
  if (!value) return 'Необходимо указать название';
}
// function validateStartDate(value) {
//   if (!value) return 'Необходимо выбрать дату';
// }
// function validateEnrollmentEndDate(value) {
//   if (!value) return 'Необходимо выбрать дату';
// }

function validateStartDate(value) {
  // if (!value || !(value instanceof Date)) return;// return 'Необходимо выбрать дату';
  // const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  // const nowDate = new Date() |> new Date(#.getFullYear(), #.getMonth(), #.getDate());
  // if (date < nowDate) return 'Значение должно быть позже сегодняшней даты';
}
function validateEnrollmentEndDate(value) {
  // if (!value || !(value instanceof Date)) return;// return 'Необходимо выбрать дату';
  // const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  // const nowDate = new Date() |> new Date(#.getFullYear(), #.getMonth(), #.getDate());
  // if (date < nowDate) return 'Значение должно быть позже сегодняшней даты';
}

function EditCourseDeliveryInstance() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    <Editor className={classes.description} name="description" label="Полное описание" />
    <DragAndDropImageDialog className={classes.picture} name="picture" label="Изображение" />
    <CourseGradeTypeSelect className={classes.gradeTypeSelect} />
    <TextField className={classes.laborInput_creditUnit} name="data.laborInput_creditUnit" multiline={true} label="Трудоемкость (в зачетных единицах)" multiline />
    <TextField className={classes.laborInput_hours} name="data.laborInput_hours" multiline={true} label="Трудоемкость (в часах)" multiline />
    <TextField className={classes.outcomes} name="data.outcomes" multiline={true} label="Результаты обучения" multiline />
    <TextField className={classes.competencies} name="data.competencies" multiline={true} label="Направленные на формирование компетенций" multiline />
    <TextField className={classes.summary} name="price" label="Цена" multiline />
    <DateTimePicker className={classes.startDate} name="startDate" validate={validateStartDate} label="Дата начала" />
    <DateTimePicker className={classes.enrollmentEndDate} name="enrollmentEndDate" validate={validateEnrollmentEndDate} label="Дата окончания регистрации" />
    <Instructors />
  </div>;
}
EditCourseDeliveryInstance = React.memo(EditCourseDeliveryInstance);

const UPDATE_COURSE_DELIVERY_INSTANCE = ({
  id = 'Int!',
  name = 'String',
  summary = 'String',
  description = 'JSON',
  picture = 'JSON',
  startDate = 'String',
  enrollmentEndDate = 'String',
  instructorKeys = 'JSON',
  price = 'Float',
  data = 'JSON'
}) => `
  updateCourseDeliveryInstance(
    id: ${id}
    name: ${name}
    summary: ${summary}
    description: ${description}
    picture: ${picture}
    startDate: ${startDate}
    enrollmentEndDate: ${enrollmentEndDate}
    instructorKeys: ${instructorKeys}
    price: ${price}
    data: ${data}
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
    description
    picture
    startDate
    enrollmentEndDate
    data
    instructors {
      id
      email
      firstname
      lastname
      middlename
      picture
    }
  }
`;

export default (
  ({ id }) => {
    const [{  courseDeliveryInstance }, loading, errors] = useQuery(COURSE_DELIVERY_INSTANCE, { id });
    const updateCourseDeliveryInstance = useMutation(UPDATE_COURSE_DELIVERY_INSTANCE, { onComplete }, { id });
    if (courseDeliveryInstance) courseDeliveryInstance.instructorKeys = courseDeliveryInstance.instructors ? courseDeliveryInstance.instructors.map(({ id }) => id) : null;
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