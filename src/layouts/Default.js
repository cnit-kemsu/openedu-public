import React from 'react';
import { useRoutes } from '@kemsu/router';
import pageNotFound from '@components/PageNotFound';
import AppBar from '@components/AppBar';
//import MainView from '@views/Main';
import AllCourseDeliveryInstancesView from '@views/Main/AllCourseDeliveryInstances';
import CourseDeliveryInstanceView from '@views/Main/CourseDeliveryInstance';
import DeliverySubsectionView from '@views/Main/DeliverySubsection';
import AccountView from '@views/Account';
import { DefaultLayout as useStyles } from './styles';
import notAuthorisedPage from '@components/NotAuthorizedPage';

const routes = [
  [/^\/$/, () => <AllCourseDeliveryInstancesView />],
  [/\/course-delivery\/(?<courseId>\d+)(\/(?<showType>\w+))?/, ({ courseId, showType }) => <CourseDeliveryInstanceView showType={showType} id={courseId} />],
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