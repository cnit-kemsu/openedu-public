import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, ListNavigator, MenuModal, DialogModal, Fab } from '@kemsu/core';
import { changeOffset, adjustOffset } from '@lib/listnav';
import AdminView from '@components/AdminView';
import RefreshBtn from '@components/RefreshBtn';
import CourseItem from './CourseReleaseItem';
import CourseReleaseContextMenu from './CourseReleaseContextMenu';
import ConfirmDeleteCourseReleaseDialog from './ConfirmDeleteCourseReleaseDialog';

export const limit = 5;

export const TOTAL_COURSE_RELEASES = () => `
  totalCourseReleases
`;
export const COURSE_RELEASES = ({ offset = 'Int' }) => `
  courseReleases(offset: ${offset}, limit: ${limit}) {
    id
    name
    summary
    releaseDate
    startDate
    enrollmentEndDate
  }
`;

function Courses({ offset, menu }) {
  
  const [{ totalCourseReleases }] = useQuery(TOTAL_COURSE_RELEASES);
  adjustOffset(totalCourseReleases, offset, limit);
  const [{ courseReleases }, loading, errors] = useQuery(COURSE_RELEASES, { offset });
  const courseReleaseItems = useElementArray(CourseItem, courseReleases, { key: course => course.id, menu });

  return <Loader loading={loading} errors={errors}>
    {courseReleases && <List>
      {courseReleaseItems}
    </List>}
    {totalCourseReleases > 0 && <ListNavigator {...{ limit, offset }} total={totalCourseReleases} onChange={changeOffset} />}
  </Loader>;
}
Courses = React.memo(Courses);

export default (props => {
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ confirmDeleteDialog });
  
  return <>
    <AdminView.AppBar>
      <Typography variant="h6">
        Список выпусков
        <RefreshBtn queries={[TOTAL_COURSE_RELEASES, COURSE_RELEASES]} />
      </Typography>
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Typography color="textPrimary">Выпуски</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <Courses {...{ menu, ...props}} />
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