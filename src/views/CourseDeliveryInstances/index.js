import React from 'react';
import { useRoutes } from '@kemsu/router';
import ListView from './ListView';
import CreateView from './CreateView';
import EditView from './EditView';
import CourseStructureView from '../CourseStructure';

const routes = [
  [/.+\/course-delivery-instances$/, props => <ListView {...props} />],
  [/.+\/course-delivery-instances\/(?<courseId>\d+)\/create/, ({ courseId }) => <CreateView courseDesignTemplateId={Number(courseId)} />],
  [/.+\/course-delivery-instances\/(?<id>\d+)\/edit/, ({ id }) => <EditView id={Number(id)} />],
  [/.+\/course-delivery-instances\/(?<id>\d+)\/structure/, ({ id }) => <CourseStructureView courseDeliveryInstanceId={Number(id)} />]
];

export default React.memo(() => useRoutes(routes));