import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { Mutation } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Link, FormErrors, Notifications } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import CreateFab from '@components/CreateFab';
import ResetButton from '@components/ResetButton';
import { validateCourseName } from '@lib/validate';
import { CourseForm as useStyles } from './styles';

function CreateCourse() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
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

  return <Fields comp={form}>
    <AdminView.AppBar>
      <AdminView.LeftBar>
        <RouteBackBtn path="/admin/courses" />
        <Typography variant="h6">Новый курс</Typography>
      </AdminView.LeftBar>
      <ResetButton />
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Link styled path="/admin/courses">Курсы</Link>
      <Typography color="textPrimary">Создать</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CreateCourse />
    </AdminView.Paper>
    <AdminView.Div>
      <FormErrors />
    </AdminView.Div>
    <CreateFab />
  </Fields>;
}
) |> React.memo(#);