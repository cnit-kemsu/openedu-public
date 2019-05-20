import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation } from '@kemsu/graphql-client';
import { useForm } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Link, FormErrors, Notifications } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import CreateFab from '@components/CreateFab';
import ResetButton from '@components/ResetButton';
import { validateSectionName } from '@lib/validate';
import { SectionForm as useStyles } from './styles';

function CreateSection({ form }) {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <TextField className={classes.name} comp={form} name="name" validate={validateSectionName} label="Название"/>
    <TextField className={classes.summary} comp={form} name="summary" label="Краткое описание" multiline />
  </div>;
}
CreateSection = React.memo(CreateSection);

const CREATE_SECTION = ({
  courseId = 'Int!',
  name = 'String!',
  summary = 'String'
}) => `
  createSection(
    courseId: ${courseId}
    name: ${name}
    summary: ${summary}
  )
`;
function onComplete({ courseId }) {
  History.push(`/admin/courses/${courseId}/sections/`);
  Notifications.push('Раздел был успешно создан.', 'success');
}
//const createSection = new Mutation(CREATE_SECTION, { onComplete }).commit;

export default (
  ({ courseId }) => {
    const createSection = useMutation(CREATE_SECTION, { onComplete }, { courseId });
    const form = useForm(createSection);

    return <>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path="/admin/users" />
          <Typography variant="h6">Новая секция</Typography>
        </AdminView.LeftBar>
        <ResetButton form={form} />
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/courses">Курсы</Link>
        <Typography color="textPrimary">Создать</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <CreateSection form={form} />
      </AdminView.Paper>
      <AdminView.Div>
        <FormErrors form={form} />
      </AdminView.Div>
      <CreateFab form={form} />
    </>;
  }
) |> React.memo(#);