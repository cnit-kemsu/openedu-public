import React from 'react';
import { useRoutes } from '@kemsu/router';
import CourseReleasesView from './CourseReleases';
import CreateCourseReleaseView from '../CourseReleases/CreateCourseRelease';
import EditCourseReleaseView from './EditCourseRelease';
import CourseStructureView from '../CourseStructure';

const routes = [
  [/.+\/releases$/, props => <CourseReleasesView {...props} />],
  [/.+\/releases\/(?<courseId>\d+)\/create/, ({ courseId }) => <CreateCourseReleaseView courseId={Number(courseId)} />],
  [/.+\/releases\/(?<id>\d+)\/edit/, ({ id }) => <EditCourseReleaseView id={Number(id)} />],
  [/.+\/releases\/(?<releaseId>\d+)\/structure/, ({ releaseId }) => <CourseStructureView releaseId={Number(releaseId)} />]
];

export default React.memo(() => useRoutes(routes));