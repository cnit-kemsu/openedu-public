import React from 'react';
import { useRoutes } from '@kemsu/router';
import pageNotFound from '@components/PageNotFound';
import AppBar from '@components/AppBar';
//import MainView from '@views/Main';
import CourseView from '@views/Main/Course';
import CoursesView from '@views/Main/Courses';
import SubsectionView from '@views/Main/subsection';
import AccountView from '@views/Account';
import { DefaultLayout as useStyles } from './styles';
import notAuthorisedPage from '@components/NotAuthorizedPage';

const routes = [
  [/^\/$/, () => <CoursesView />],
  [/\/course\/(?<courseId>\d+)/, ({ courseId }) => <CourseView courseId={courseId} />],
  [/\/subsection\/(?<id>\d+)/, ({ id }) => <SubsectionView id={id} />],
  [/\/account/, () => <AccountView />]
];

function DefaultLayout({ notAuthorized }) {
  
  const classes = useStyles();
  return <div className={classes.root}>
    <AppBar />
    {useRoutes(routes) || (notAuthorized ? notAuthorisedPage : pageNotFound)}
  </div >;
}

export default React.memo(DefaultLayout);