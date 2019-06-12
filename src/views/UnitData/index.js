import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation, useQuery } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
import TextUnitView from './TextUnit';
import VideoUnitView from './VideoUnit';
//import QuizUnitView from './QuizUnit';

const UPDATE_UNIT = ({
  id = 'Int!',
  data = 'JSON'
}) => `
  updateUnit(
    id: ${id}
    data: ${data}
  )
`;
function onComplete(courseId) {
  History.push(`/admin/courses/${courseId}/structure`);
  Notifications.push('Блок был успешно обновлен.', 'success');
}

export const UNIT = ({
  id = 'Int!'
}) => `
  unit(id: ${id}) {
    name
    type
    data
    subsection {
      name
      section {
        name
        course {
          id
          name
        }
      }
    }
  }
`;

export default React.memo(
  ({ id }) => {
    const [{ unit: { name, type, data, subsection } = {} }, loading, errors] = useQuery(UNIT, { id });
    const section = subsection?.section;
    const course = subsection?.section?.course;
    const updatUnit = useMutation(UPDATE_UNIT, { onComplete: () => onComplete(course?.id) }, { id });
    const form = useForm(updatUnit, { data });

    return <Fields comp={form}>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path={`/admin/courses/${course?.id}/content`} />
          <Typography variant="h6">Редактирование блока: {name}</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/courses">Курсы</Link>
        <Link styled path={`/admin/courses/${course?.id}/structure`}>Структура: {course?.name}</Link>
        <Typography color="textPrimary">Раздел: {section?.name}</Typography>
        <Typography color="textPrimary">Подраздел: {subsection?.name}</Typography>
        <Typography color="textPrimary">Блок: {name}</Typography>
        <Typography color="textPrimary">Содержимое</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Div>
        <Loader loading={loading} errors={errors}>
          {type === 'TEXT' && <TextUnitView />}
          {type === 'VIDEO' && <VideoUnitView />}
          {/* {type === 'QUIZ' && <QuizUnitView />} */}
        </Loader>
      </AdminView.Div>
      <AdminView.Div>
        <FormErrors />
      </AdminView.Div>
      <UpdateFab {...{ loading, errors }} />
    </Fields>;
  }
);