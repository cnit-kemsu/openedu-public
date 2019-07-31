import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, ListNavigator, MenuModal, DialogModal, Fab } from '@kemsu/core';
import { changeOffset, adjustOffset } from '@lib/listnav';
import AdminView from '@components/AdminView';
import RefreshBtn from '@components/RefreshBtn';
import CourseDeliveryInstanceItem from './ItemView';
import CourseReleaseContextMenu from './ContextMenu';
import ConfirmDeleteCourseReleaseDialog from './ConfirmDeleteDialog';

export const limit = 5;

export const TOTAL_COURSE_DELIVERY_INSTANCES = () => `
  totalCourseDeliveryInstances
`;
export const ALL_COURSE_DELIVERY_INSTANCES = ({ offset = 'Int' }) => `
  allCourseDeliveryInstances(offset: ${offset}, limit: ${limit}) {
    id
    name
    summary
    creatorId
    creationDate
    startDate
    enrollmentEndDate
  }
`;

function CourseDeliveryInstances({ offset, menu }) {
  
  const [{ totalCourseDeliveryInstances }] = useQuery(TOTAL_COURSE_DELIVERY_INSTANCES);
  adjustOffset(totalCourseDeliveryInstances, offset, limit);
  const [{ allCourseDeliveryInstances }, loading, errors] = useQuery(ALL_COURSE_DELIVERY_INSTANCES, { offset });
  const courseReleaseItems = useElementArray(CourseDeliveryInstanceItem, allCourseDeliveryInstances, { key: course => course.id, menu });

  return <Loader loading={loading} errors={errors}>
    {allCourseDeliveryInstances && <List>
      {courseReleaseItems}
    </List>}
    {totalCourseDeliveryInstances > 0 && <ListNavigator {...{ limit, offset }} total={totalCourseDeliveryInstances} onChange={changeOffset} />}
  </Loader>;
}
CourseDeliveryInstances = React.memo(CourseDeliveryInstances);

export default (props => {
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ confirmDeleteDialog });
  
  return <>
    <AdminView.AppBar>
      <Typography variant="h6">
        Список экземпляров курсов
        <RefreshBtn queries={[TOTAL_COURSE_DELIVERY_INSTANCES, ALL_COURSE_DELIVERY_INSTANCES]} />
      </Typography>
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Typography color="textPrimary">Реализация курсов</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <CourseDeliveryInstances {...{ menu, ...props}} />
    </AdminView.Paper>

    <MenuModal mgr={menu}>
      {CourseReleaseContextMenu}
    </MenuModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteCourseReleaseDialog}
    </DialogModal>
  </>;
})
|> React.memo(#);