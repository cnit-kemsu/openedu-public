import React from 'react';
import { useRoutes } from '@kemsu/router';
import CoursesView from './Courses';
import CreateCourseView from './CreateCourse';
import EditCourseView from './EditCourse';
import SectionsView from './Sections';
import BlockContentView from './Blocks/BlockContent';

const routes = [
  [/.+\/courses$/, props => <CoursesView {...props} />],
  [/.+\/courses\/create/, () => <CreateCourseView />],
  [/.+\/courses\/(?<id>\d+)\/edit/, ({ id }) => <EditCourseView id={Number(id)} />],
  [/.+\/courses\/(?<courseId>\d+)\/structure/, ({ courseId }) => <SectionsView courseId={Number(courseId)} />],
  [/.+\/courses\/(?<courseId>\d+)\/sections\/(?<sectionId>\d+)\/subsections\/(?<subsectionId>\d+)\/blocks\/(?<blockId>\d+)/, ({ blockId, ...props }) => <BlockContentView blockId={Number(blockId)} {...props} />]
];

export default (() => useRoutes(routes))
|> React.memo(#);