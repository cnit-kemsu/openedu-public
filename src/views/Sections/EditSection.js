import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation, useQuery } from '@kemsu/graphql-client';
import { useForm, useInitialize } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
import { validateCourseName } from '@lib/validate';
import { CourseForm as useStyles } from './styles';

function EditCourse({ form }) {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} comp={form} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} comp={form} name="summary" label="Краткое описание" multiline />
  </div>;
}
EditCourse = React.memo(EditCourse);

const UPDATE_COURSE = ({
  id = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  updateCourse(
    id: ${id}
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete() {
  History.push('/admin/courses');
  Notifications.push('Пользователь был успешно обновлен.', 'success');
}

export const COURSE = ({ id = 'Int!' }) => `
  course(id: ${id}) {
    name
    summary
  }
`;

export default (
  ({ id }) => {
    const [{ course }, loading, errors] = useQuery(COURSE, { id });
    const updateCourse = useMutation(UPDATE_COURSE, { onComplete }, { id });
    const form = useForm(updateCourse);
    useInitialize(form, () => ({ ...course }), [course]);

    return <>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path="/admin/courses" />
          <Typography variant="h6">Редактирование курса: {course?.name}</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ form, loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/courses">Курсы</Link>
        <Typography color="textPrimary">Изменить</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <Loader loading={loading} errors={errors}>
          {course && <EditCourse form={form} />}
        </Loader>
      </AdminView.Paper>
      <AdminView.Div>
        <FormErrors form={form} />
      </AdminView.Div>
      <UpdateFab {...{ form, loading, errors }} />
    </>;
  }
) |> React.memo(#);