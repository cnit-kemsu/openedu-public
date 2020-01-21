import React from 'react';
import Typography from '@material-ui/core/Typography';
import { History } from '@kemsu/router';
import { useMutation, useQuery, refetch } from '@kemsu/graphql-client';
import { useForm, Fields } from '@kemsu/form';
import { Link, FormErrors, Notifications, Loader } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import UpdateFab from '@components/UpdateFab';
import ResetButton from '@components/ResetButton';
import DocumentUnitView from './DocumentUnit';
import FileDocumentUnitView from './FileDocumentUnit';
import VideoUnitView from './VideoUnit';
import QuizUnitView from './QuizUnit';

const UPDATE_UNIT_DESIGN = ({
  id = 'Int!',
  data = 'JSON'
}) => `
  updateCourseDesignUnit(
    id: ${id}
    data: ${data}
  )
`;

const UPDATE_UNIT_DELIVERY = ({
  id = 'Int!',
  data = 'JSON'
}) => `
  updateCourseDeliveryUnit(
    id: ${id}
    data: ${data}
  )
`;

function getPreviousState() {
  const previousState = History.getPreviousState();
  console.log(previousState);
  if (previousState) {
    if (
      previousState.path.includes('/admin/course-delivery-instances/')
      || previousState.path.includes('/admin/course-design-templates/')
    ) return previousState.state;
  }
  return {};
}

function onComplete(id, courseId, isDelivery) {
  getPreviousState();
  History.push(isDelivery ? `/admin/course-delivery-instances/${courseId}/structure` : `/admin/course-design-templates/${courseId}/structure`, {}, getPreviousState());
  Notifications.push('Блок был успешно обновлен.', 'success');
}

export const UNIT_DESIGN = ({
  id = 'Int!'
}) => `
  courseDesignUnit(id: ${id}) {
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

export const UNIT_DELIVERY = ({
  id = 'Int!'
}) => `
  courseDeliveryUnit(id: ${id}) {
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
  ({ id, isDelivery }) => {

    const UNIT_QUERY = isDelivery ? UNIT_DELIVERY : UNIT_DESIGN;
    const [{ [isDelivery ? 'courseDeliveryUnit' : 'courseDesignUnit']: { name, type, data, subsection } = {} }, loading, errors] = useQuery(UNIT_QUERY, { id });
    const section = subsection?.section;
    const course = subsection?.section?.course;
    const routeBackPath = isDelivery ? `/admin/course-delivery-instances/${course?.id}/structure` : `/admin/course-design-templates/${course?.id}/structure`;

    const UPDATE_MUTATION = isDelivery ? UPDATE_UNIT_DELIVERY : UPDATE_UNIT_DESIGN;
    const updateUnit = useMutation(UPDATE_MUTATION,
      { onComplete: () => onComplete(id, course?.id, isDelivery) },
      { id });

    const _data = type === 'QUIZ' ? {
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
        <Link styled path={isDelivery ? '/admin/course-delivery-instances' : '/admin/course-design-templates'}>{isDelivery ? 'Реализация курсов' : 'Дизайн курсов'}</Link>
        <Link styled path={routeBackPath}>Структура: {course?.name}</Link>
        <Typography color="textPrimary">Раздел: {section?.name}</Typography>
        <Typography color="textPrimary">Подраздел: {subsection?.name}</Typography>
        <Typography color="textPrimary">Блок: {name}</Typography>
        <Typography color="textPrimary">Содержимое</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Div>
        <Loader loading={loading} errors={errors}>
          {type === 'DOCUMENT' && <DocumentUnitView />}
          {type === 'FILE_DOCUMENT' && <FileDocumentUnitView />}
          {type === 'VIDEO' && <VideoUnitView />}
          {type === 'QUIZ' && <QuizUnitView />}
        </Loader>
      </AdminView.Div>
      <AdminView.Div>
        <FormErrors />
      </AdminView.Div>
      <UpdateFab />
      {/* <UpdateFab onClick={() => { form.submit(); refetch(UNIT_QUERY); }} style={{ marginBottom: '64px' }} {...{ loading, errors }} />
      <UpdateFab onClick={() => { form.submit(); onComplete(course?.id, isDelivery); }} {...{ loading, errors }}>Сохранить и вернуться</UpdateFab> */}
    </Fields>;
  }
);