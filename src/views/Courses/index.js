import React from 'react';
import { useRoutes } from '@kemsu/router';
import CoursesView from './Courses';
import CreateCourseView from './CreateCourse';
import EditCourseView from './EditCourse';
import CourseStructureView from './Sections';

const routes = [
  [/.+\/courses$/, props => <CoursesView {...props} />],
  [/.+\/courses\/create/, () => <CreateCourseView />],
  [/.+\/courses\/(?<id>\d+)\/edit/, ({ id }) => <EditCourseView id={Number(id)} />],
  [/.+\/courses\/(?<courseId>\d+)\/structure/, ({ courseId }) => <CourseStructureView courseId={Number(courseId)} />]
];

export default React.memo(() => useRoutes(routes));