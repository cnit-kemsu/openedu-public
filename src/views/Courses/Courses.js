import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, ListNavigator, MenuModal, DialogModal, Fab } from '@kemsu/core';
import { changeOffset, adjustOffset } from '@lib/listnav';
import AdminView from '@components/AdminView';
import RefreshBtn from '@components/RefreshBtn';
import CourseItem from './CourseItem';
import CourseContextMenu from './CourseContextMenu';
import ConfirmDeleteCourseDialog from './ConfirmDeleteCourseDialog';

export const limit = 5;

export const TOTAL_COURSES = () => `
  totalCourses
`;
export const COURSES = ({ offset = 'Int' }) => `
  courses(offset: ${offset}, limit: ${limit}) {
    id
    name
    summary
  }
`;

function Courses({ offset, menu }) {
  
  const [{ totalCourses }] = useQuery(TOTAL_COURSES);
  adjustOffset(totalCourses, offset, limit);
  const [{ courses }, loading, errors] = useQuery(COURSES, { offset });
  const courseItems = useElementArray(CourseItem, courses, { key: course => course.id, menu });

  return <Loader loading={loading} errors={errors}>
    {courses && <List>
      {courseItems}
    </List>}
    {totalCourses > 0 && <ListNavigator limit={limit} total={totalCourses} offset={offset} onChange={changeOffset} />}
  </Loader>;
}
Courses = React.memo(Courses);

function routeToCreateCourseView() { History.push('/admin/courses/create'); }

export default (props => {
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ confirmDeleteDialog });
  
  return <>
    <AdminView.AppBar>
      <Typography variant="h6">
        Список курсов
        <RefreshBtn queries={[TOTAL_COURSES, COURSES]} />
      </Typography>
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Typography color="textPrimary">Курсы</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <Courses {...props} {...{ menu }}  />
    </AdminView.Paper>
    <Fab icon={AddIcon} onClick={routeToCreateCourseView}>
      Создать
    </Fab>

    <MenuModal mgr={menu}>
      {CourseContextMenu}
    </MenuModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteCourseDialog}
    </DialogModal>
  </>;
})
|> React.memo(#);