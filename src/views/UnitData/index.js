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
import QuizUnitView from './QuizUnit';

const UPDATE_UNIT = ({
  id = 'Int!',
  data = 'JSON'
}) => `
  updateUnit(
    id: ${id}
    data: ${data}
  )
`;

const UPDATE_UNIT_RELEASE = ({
  id = 'Int!',
  data = 'JSON'
}) => `
  updateUnitRelease(
    id: ${id}
    data: ${data}
  )
`;

function onComplete(courseId, release) {
  History.push(release ? `/admin/releases/${courseId}/structure` : `/admin/courses/${courseId}/structure`);
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

export const UNIT_RELEASE = ({
  id = 'Int!'
}) => `
  unitRelease(id: ${id}) {
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
  ({ id, release }) => {

    const UNIT_QUERY = release ? UNIT_RELEASE : UNIT;
    const [{ [release ? 'unitRelease' : 'unit']: { name, type, data, subsection } = {} }, loading, errors] = useQuery(UNIT_QUERY, { id });
    const section = subsection?.section;
    const course = subsection?.section?.course;
    const routeBackPath = release ? `/admin/releases/${course?.id}/structure` : `/admin/courses/${course?.id}/structure`;

    const UPDATE_MUTATION = release ? UPDATE_UNIT_RELEASE : UPDATE_UNIT;
    const updateUnit = useMutation(UPDATE_MUTATION, { onComplete: () => onComplete(course?.id, release) }, { id });

    const _data = type === 'QUIZ' ? {
      totalAttempts: 2,
      timeLimit: '60',
      maxScore: 100,
      ...data
    } : data;
    const form = useForm(updateUnit, { data: _data });

    return <Fields comp={form}>
      <AdminView.AppBar>
        <AdminView.LeftBar>
          <RouteBackBtn path={routeBackPath} />
          <Typography variant="h6">Редактирование блока: {name}</Typography>
        </AdminView.LeftBar>
        <ResetButton {...{ loading, errors }}>Сбросить</ResetButton>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path={release ? '/admin/releases' : '/admin/courses'}>{release ? 'Выпуски' : 'Курсы'}</Link>
        <Link styled path={routeBackPath}>Структура: {course?.name}</Link>
        <Typography color="textPrimary">Раздел: {section?.name}</Typography>
        <Typography color="textPrimary">Подраздел: {subsection?.name}</Typography>
        <Typography color="textPrimary">Блок: {name}</Typography>
        <Typography color="textPrimary">Содержимое</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Div>
        <Loader loading={loading} errors={errors}>
          {type === 'TEXT' && <TextUnitView />}
          {type === 'VIDEO' && <VideoUnitView />}
          {type === 'QUIZ' && <QuizUnitView />}
        </Loader>
      </AdminView.Div>
      <AdminView.Div>
        <FormErrors />
      </AdminView.Div>
      <UpdateFab {...{ loading, errors }} />
    </Fields>;
  }
);