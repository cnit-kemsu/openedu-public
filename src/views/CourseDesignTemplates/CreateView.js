import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { Mutation } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { TextField, Editor, DragAndDropImageDialog } from '@kemsu/inputs';
import { Link, FormErrors, Notifications } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import CreateFab from '@components/CreateFab';
import ResetButton from '@components/ResetButton';
import { validateCourseName } from '@lib/validate';
import CourseGradeTypeSelect from '@views/_shared/CourseGradeTypeSelect';
import { CourseForm as useStyles } from './styles';

function CreateCourseDesignTemplate() {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} name="name" validate={validateCourseName} label="Название"/>
    <TextField className={classes.summary} name="summary" label="Краткое описание" multiline />
    <Editor className={classes.description} name="description" label="Полное описание" />
    <DragAndDropImageDialog className={classes.picture} name="picture" label="Изображение" />
    <CourseGradeTypeSelect className={classes.gradeTypeSelect} />
    <TextField className={classes.laborInput_creditUnit} name="data.labourInput_creditUnit" multiline={true} label="Трудоемкость (в зачетных единицах)" multiline />
    <TextField className={classes.laborInput_hours} name="data.labourInput_hours" multiline={true} label="Трудоемкость (в часах)" multiline />
    <TextField className={classes.outcomes} name="data.outcomes" multiline={true} label="Результаты обучения" multiline />
    <TextField className={classes.competencies} name="data.competencies" multiline={true} label="Направленные на формирование компетенций" multiline />
  </div>;
}
CreateCourseDesignTemplate = React.memo(CreateCourseDesignTemplate);

const CREATE_COURSE_DESIGN_TEMPLATE = ({
  name = 'String!',
  summary = 'String',
  description = 'JSON',
  picture = 'JSON',
  data = 'JSON'
}) => `
  createCourseDesignTemplate(
    name: ${name}
    summary: ${summary}
    description: ${description}
    picture: ${picture}
    data: ${data}
  )
`;
function onComplete() {
  History.push('/admin/course-design-templates');
  Notifications.push('Шаблон курса был успешно создан.', 'success');
}
const createCourseDesignTemplate = new Mutation(CREATE_COURSE_DESIGN_TEMPLATE, { onComplete }).commit;

const initialValues = {
  data: {
    gradeType: 'SCORE'
  }
};

export default (() => {
  const form = useForm(createCourseDesignTemplate, initialValues);

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