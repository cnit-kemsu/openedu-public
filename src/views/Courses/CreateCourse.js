import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { Mutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Link, FormErrors, Notifications } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import CreateFab from '@components/CreateFab';
import ResetButton from '@components/ResetButton';
import { validateCourseName } from '@lib/validate';
import { CourseForm as useStyles } from './styles';

function CreateCourse({ form }) {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} comp={form} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} comp={form} name="summary" label="Краткое описание" multiline />
  </div>;
}
CreateCourse = React.memo(CreateCourse);

const CREATE_COURSE = ({
  name = 'String!',
  summary = 'String'
}) => `
  createCourse(
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete() {
  History.push('/admin/courses');
  Notifications.push('Курс был успешно создан.', 'success');
}
const createCourse = new Mutation(CREATE_COURSE, { onComplete }).commit;

export default (() => {
  const form = useForm(createCourse);

  return <>
    <AdminView.AppBar>
      <AdminView.LeftBar>
        <RouteBackBtn path="/admin/users" />
        <Typography variant="h6">Новый курс</Typography>
      </AdminView.LeftBar>
      <ResetButton form={form} />
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Link styled path="/admin/courses">Курсы</Link>
      <Typography color="textPrimary">Создать</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CreateCourse form={form} />
    </AdminView.Paper>
    <AdminView.Div>
      <FormErrors form={form} />
    </AdminView.Div>
    <CreateFab form={form} />
  </>;
}
) |> React.memo(#);