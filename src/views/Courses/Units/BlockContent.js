import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { History } from '@kemsu/router';
import { useMutation, useQuery } from '@kemsu/graphql-client';
import { useForm, useInitialize } from '@kemsu/form';
import { TextField } from '@kemsu/inputs';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
import EditQuizBlock from './EditQuizBlock';
import { TextBlockForm as useTextBlockStyles, VideoBlockForm as useVideoBlockStyles } from './styles';

function EditTextBlock({ form }) {

  const classes = useTextBlockStyles();
  return <Paper className={classes.root}>
    <TextField className={classes.text} comp={form} name="data.text" label="Текст" multiline rows={10} />
  </Paper>;
}
EditTextBlock = React.memo(EditTextBlock);

function EditVideoBlock({ form }) {

  const classes = useVideoBlockStyles();
  return <Paper className={classes.root}>
    <TextField className={classes.video} comp={form} name="data.videoUrl" label="URL видео" />
  </Paper>;
}
EditVideoBlock = React.memo(EditVideoBlock);

function EditBlock({ form, type }) {
  
  if (type === 'TEXT') return <EditTextBlock form={form} />;
  if (type === 'VIDEO') return <EditVideoBlock form={form} />;
  if (type === 'QUIZ') return <EditQuizBlock form={form} />;
}
EditBlock = React.memo(EditBlock);

const UPDATE_BLOCK = ({
  id = 'Int!',
  data = 'JSON'
}) => `
  updateBlock(
    id: ${id}
    data: ${data}
  )
`;
function onComplete(courseId) {
  History.push(`/admin/courses/${courseId}/content`);
  Notifications.push('Пользователь был успешно обновлен.', 'success');
}

export const INFO = ({
  courseId = 'Int!',
  sectionId = 'Int!',
  subsectionId = 'Int!',
  blockId = 'Int!'
}) => `
  course(id: ${courseId}) {
    name
  }
  section(id: ${sectionId}) {
    name
  }
  subsection(id: ${subsectionId}) {
    name
  }
  block(id: ${blockId}) {
    name
    type
    data
  }
`;

export default (
  ({ courseId, sectionId, subsectionId, blockId }) => {
    const [{ course, section, subsection, block: { name, type, data } = {} }, loading, errors] = useQuery(INFO, { courseId, sectionId, subsectionId, blockId });
    const updateBlock = useMutation(UPDATE_BLOCK, { onComplete: () => onComplete(courseId) }, { id: blockId });
    const form = useForm(updateBlock);
    useInitialize(form, () => ({ data: data || undefined }), [data]);

    return <>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path={`/admin/courses/${courseId}/content`} />
          <Typography variant="h6">Редактирование блока: {name}</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ form, loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/courses">Курсы</Link>
        <Link styled path={`/admin/courses/${courseId}/content`}>Структура: {course?.name}</Link>
        <Typography color="textPrimary">Раздел: {section?.name}</Typography>
        <Typography color="textPrimary">Подраздел: {subsection?.name}</Typography>
        <Typography color="textPrimary">Содержимое блока</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Div>
        <Loader loading={loading} errors={errors}>
          {type && <EditBlock form={form} type={type} />}
        </Loader>
      </AdminView.Div>
      <AdminView.Div>
        <FormErrors form={form} />
      </AdminView.Div>
      <UpdateFab {...{ form, loading, errors }} />
    </>;
  }
) |> React.memo(#);