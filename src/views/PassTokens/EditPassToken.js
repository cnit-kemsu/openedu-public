import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { TextField } from '@kemsu/inputs';
import { useMutation, useQuery } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
import Courses from './Courses';
//import Emails from './Emails';
import { TokenForm as useStyles } from './styles';

function EditPassToken() {
  
  const classes = useStyles();
  return <div className={classes.root}>

    <TextField className={classes.name} name="name" label="Название" />
    <TextField className={classes.comments} name="comments" label="Комментарии" multiline />
    <Courses />
    {/* <Emails /> */}
    
  </div>;
}
EditPassToken = React.memo(EditPassToken);

const UPDATE_PASSTOKEN = ({
  id = 'Int!',
  name = 'String',
  comments = 'String',
  courseKeys = '[Int!]',
  emails = '[String!]'
}) => `
  updatePassToken(
    id: ${id}
    name: ${name}
    comments: ${comments}
    courseKeys: ${courseKeys}
    emails: ${emails}
  )
`;
function onComplete() {
  History.push('/admin/pass-tokens');
  Notifications.push('Пропуск был успешно обновлен.', 'success');
}

export const PASSTOKEN = ({ id = 'Int!' }) => `
  passToken(id: ${id}) {
    id
    name
    comments
    courseKeys: courses {
      id
      name
      creationDate
      picture
    }
    emails
  }
`;

function mapValues({ courseKeys, ...values }) {
  return {
    courseKeys: courseKeys && courseKeys.map(({ id }) => id),
    ...values
  };
}

export default (
  ({ id }) => {
    const [{ passToken }, loading, errors] = useQuery(PASSTOKEN, { id });
    const updatePassToken = useMutation(UPDATE_PASSTOKEN, { onComplete }, { id });
    const form = useForm(updatePassToken, passToken, null, { mapValues });

    return <Fields comp={form}>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path="/admin/pass-tokens" />
          <Typography variant="h6">Редактирование пропуска</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/pass-tokens">Пропуска</Link>
        <Typography color="textPrimary">Изменить</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <Loader loading={loading} errors={errors}>
          {passToken && <EditPassToken />}
        </Loader>
      </AdminView.Paper>
      <AdminView.Div>
        <FormErrors />
      </AdminView.Div>
      <UpdateFab {...{ loading, errors }} />
    </Fields>;
  }
) |> React.memo(#);