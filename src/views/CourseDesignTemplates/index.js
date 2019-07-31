import React from 'react';
import { useRoutes } from '@kemsu/router';
import CourseDesignTemplatesView from './ListView';
import CreateCourseDesignTemplateView from './CreateView';
import EditCourseDesignTemplateView from './EditView';
import CourseStructureView from '../CourseStructure';

const routes = [
  [/.+\/course-design-templates$/, props => <CourseDesignTemplatesView {...props} />],
  [/.+\/course-design-templates\/create/, () => <CreateCourseDesignTemplateView />],
  [/.+\/course-design-templates\/(?<id>\d+)\/edit/, ({ id }) => <EditCourseDesignTemplateView id={Number(id)} />],
  [/.+\/course-design-templates\/(?<id>\d+)\/structure/, ({ id }) => <CourseStructureView courseDesignTemplateId={Number(id)} />]
];

export default React.memo(() => useRoutes(routes));