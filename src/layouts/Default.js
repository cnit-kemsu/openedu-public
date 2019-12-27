import React from 'react';
import { useRoutes } from '@kemsu/router';
import pageNotFound from '@components/PageNotFound';
import AppBar from '@components/AppBar';
//import MainView from '@views/Main';
import Main from '@views/Main';
import CourseView from '@views/Main/Course';
import DeliverySubsectionView from '@views/Main/DeliverySubsection';
import AccountView from '@views/Account';
import { DefaultLayout as useStyles } from './styles';
import notAuthorisedPage from '@components/NotAuthorizedPage';
import MyCoursesView from '@views/Main/MyCourses';

const routes = [
  [/^\/$/, () => <Main />],
  [/\/my-courses/, () => <MyCoursesView />],
  [/\/course-delivery\/(?<courseId>\d+)(\/(?<showType>\w+))?/, ({ courseId, showType }) => <CourseView showType={showType} id={courseId} />],
  [/\/delivery-subsection\/(?<subsectionId>\d+)/, ({ subsectionId }) => <DeliverySubsectionView id={subsectionId} />],
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