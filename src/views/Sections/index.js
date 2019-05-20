import React from 'react';
import { useRoutes } from '@kemsu/router';
import SectionsView from './Sections';
import CreateSectionView from './CreateSection';
import EditSectionView from './EditSection';

const routes = [
  [/.+\/(?<courseId>\d+)\/sections$/, ({ courseId }) => <SectionsView courseId={Number(courseId)} />],
  [/.+\/(?<courseId>\d+)\/sections\/create/, ({ courseId }) => <CreateSectionView courseId={Number(courseId)} />],
  [/.+\/(?<courseId>\d+)\/sections\/edit\/(?<id>\d+)/, ({ courseId, id }) => <EditSectionView id={Number(id)} />],
  //[/.+\/(\d+)\/sections\/(?<id>\d+)\/subsections/, ({ id }) => <SubsectionsView id={Number(id)} />]
];

export default (() => useRoutes(routes))
|> React.memo(#);