import React from 'react';
import { useRoutes } from '@kemsu/router';
import CoursesView from './Courses';
import CreateCourseView from './CreateCourse';
import EditCourseView from './EditCourse';

const routes = [
  [/.+\/courses$/, props => <CoursesView {...props} />],
  [/.+\/courses\/create/, () => <CreateCourseView />],
  [/.+\/courses\/edit\/(?<id>\d+)/, ({ id }) => <EditCourseView id={Number(id)} />]
];

export default (() => useRoutes(routes))
|> React.memo(#);