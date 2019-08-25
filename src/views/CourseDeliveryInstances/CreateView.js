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
  if (!value) return;// return 'Необходимо выбрать дату';
  const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const nowDate = new Date() |> new Date(#.getFullYear(), #.getMonth(), #.getDate());
  if (date < nowDate) return 'Значение должно быть позже сегодняшней даты';
}
function validateEnrollmentEndDate(value) {
  if (!value) return;// return 'Необходимо выбрать дату';
  const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const nowDate = new Date() |> new Date(#.getFullYear(), #.getMonth(), #.getDate());
  if (date < nowDate) return 'Значение должно быть позже сегодняшней даты';
}

function CreateCourseDeliveryInstance() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <DateTimePicker className={classes.startDate} name="startDate" validate={validateStartDate} label="Дата начала" />
    <DateTimePicker className={classes.enrollmentEndDate} name="enrollmentEndDate" validate={validateEnrollmentEndDate} label="Дата окончания регистрации" />
  </div>;
}
CreateCourseDeliveryInstance = React.memo(CreateCourseDeliveryInstance);

const CREATE_COURSE_DELIVERY_INSTANCE = ({
  courseDesignTemplateId = 'Int!',
  startDate = 'String',
  enrollmentEndDate = 'String'
}) => `
  createCourseDeliveryInstance(
    courseDesignTemplateId: ${courseDesignTemplateId}
    startDate: ${startDate}
    enrollmentEndDate: ${enrollmentEndDate}
  )
`;
function onComplete() {
  History.push('/admin/course-design-templates');
  Notifications.push('Экземпляр курса был успешно создан.', 'success');
}
export default (({ courseDesignTemplateId }) => {
  const createCourseDeliveryInstance = useMutation(CREATE_COURSE_DELIVERY_INSTANCE, { onComplete }, { courseDesignTemplateId });
  const form = useForm(createCourseDeliveryInstance);

  return <Fields comp={form}>
    <AdminView.AppBar>
      <AdminView.LeftBar>
        <RouteBackBtn path="/admin/course-design-templates" />
        <Typography variant="h6">Новый экземпляр курса</Typography>
      </AdminView.LeftBar>
      <ResetButton />
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Link styled path="/admin/course-design-templates">Дизайн курсов</Link>
      <Typography color="textPrimary">Создать экземпляр</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CreateCourseDeliveryInstance />
    </AdminView.Paper>
    <AdminView.Div>
      <FormErrors />
    </AdminView.Div>
    <CreateFab />
  </Fields>;
}
) |> React.memo(#);