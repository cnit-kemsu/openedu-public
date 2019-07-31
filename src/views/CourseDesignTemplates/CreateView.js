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

function CreateCourseDesignTemplate() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
  </div>;
}
CreateCourseDesignTemplate = React.memo(CreateCourseDesignTemplate);

const CREATE_COURSE_DESIGN_TEMPLATE = ({
  name = 'String!',
  summary = 'String'
}) => `
  createCourseDesignTemplate(
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete() {
  History.push('/admin/course-design-templates');
  Notifications.push('Шаблон курса был успешно создан.', 'success');
}
const createCourseDesignTemplate = new Mutation(CREATE_COURSE_DESIGN_TEMPLATE, { onComplete }).commit;

export default (() => {
  const form = useForm(createCourseDesignTemplate);

  return <Fields comp={form}>
    <AdminView.AppBar>
      <AdminView.LeftBar>
        <RouteBackBtn path="/admin/course-design-templates" />
        <Typography variant="h6">Новый шаблон курса</Typography>
      </AdminView.LeftBar>
      <ResetButton />
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Link styled path="/admin/course-design-templates">Дизайн курсов</Link>
      <Typography color="textPrimary">Создать шаблон</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CreateCourseDesignTemplate />
    </AdminView.Paper>
    <AdminView.Div>
      <FormErrors />
    </AdminView.Div>
    <CreateFab />
  </Fields>;
}
) |> React.memo(#);