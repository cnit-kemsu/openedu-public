import React from 'react';
import { History, Location, useRoutes } from '@kemsu/router';
import pageNotFound from '@components/PageNotFound';
import Drawer from '@components/Drawer';
import UsersView from '@views/Users';
import CourseDesignTemplatesView from '@views/CourseDesignTemplates';
import CourseDeliveryInstancesView from '@views/CourseDeliveryInstances';
import UnitDataView from '@views/UnitData';
import PassTokensView from '@views/PassTokens';
import { AdminLayout as useStyles } from './styles';

const routes = [
  [/.+\/users/, () => <UsersView />],
  [/.+\/course-design-templates/, () => <CourseDesignTemplatesView />],
  [/.+\/course-delivery-instances/, () => <CourseDeliveryInstancesView />],
  [/.+\/design-units\/(?<id>\d+)/, ({ id }) => <UnitDataView id={Number(id)} isDelivery={false} />],
  [/.+\/delivery-units\/(?<id>\d+)/, ({ id }) => <UnitDataView id={Number(id)} isDelivery />],
  [/.+\/pass-tokens/, ({ id }) => <PassTokensView id={Number(id)} />]
];

function AdminLayout() {
  
  if (Location.path === '/admin') History.replace('/admin/users');

  const classes = useStyles();
  return <>
    <Drawer />
    <div className={classes.view}>
      {useRoutes(routes) || pageNotFound}
    </div>
  </>;
}

export default React.memo(AdminLayout);