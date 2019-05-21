import React from 'react';
import { useRoutes } from '@kemsu/router';
import SectionsView from './Sections';

export { SECTIONS } from './Sections';

const routes = [
  [/.+\/(?<courseId>\d+)\/content$/, ({ courseId }) => <SectionsView courseId={Number(courseId)} />]
];

export default (() => useRoutes(routes))
|> React.memo(#);