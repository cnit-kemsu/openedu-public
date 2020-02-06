import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { DateTimePicker, TextField } from '@kemsu/inputs';
import { Link, FormErrors, Notifications } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import CreateFab from '@components/CreateFab';
import ResetButton from '@components/ResetButton';
import { CourseReleaseForm as useStyles } from './styles';

function CreatePassToken() {
  
  const classes = useStyles();
  return <div className={classes.root}>
  </div>;
}
CreatePassToken = React.memo(CreatePassToken);

const CREATE_PASSTOKEN = ({
  courseId = 'Int!',
  emails = '[String!]!',
  comments = 'String'
}) => `
  createPassToken(
    courseId: ${courseId}
    emails: ${emails}
    comments: ${comments}
  )
`;
function onComplete() {
  History.push('/admin/pass-tokens');
  Notifications.push('Пропуск был успешно создан.', 'success');
}
export default (({ courseDesignTemplateId }) => {
  const createPassToken = useMutation(CREATE_PASSTOKEN, { onComplete }, { courseDesignTemplateId });
  const form = useForm(createPassToken);

  return <Fields comp={form}>
    <AdminView.AppBar>
      <AdminView.LeftBar>
        <RouteBackBtn path="/admin/pass-tokens" />
        <Typography variant="h6">Новый пропуск</Typography>
      </AdminView.LeftBar>
      <ResetButton />
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Link styled path="/admin/pass-tokens">Пропуска</Link>
      <Typography color="textPrimary">Создать пропуск</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CreatePassToken />
    </AdminView.Paper>
    <AdminView.Div>
      <FormErrors />
    </AdminView.Div>
    <CreateFab />
  </Fields>;
}
) |> React.memo(#);