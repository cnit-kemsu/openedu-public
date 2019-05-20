import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, MenuModal, DialogModal, Fab, Link } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import RefreshBtn from '@components/RefreshBtn';
import SectionItem from './SectionItem';
import SectionContextMenu from './SectionContextMenu';
import ConfirmDeleteSectionDialog from './ConfirmDeleteSectionDialog';

export const limit = 5;

export const SECTIONS = ({ courseId = 'Int!' }) => `
  course(id: ${courseId}) {
    id
    name
    sections {
      id
      name
      summary
    }
  }
`;

function Sections({ course: { sections }, menu }) {
  const sectionItems = useElementArray(SectionItem, sections, { key: section => section.id, menu });

  return <List>
    {sectionItems}
  </List>;
}
Sections = React.memo(Sections);

function routeToCreateSectionView(courseId) { History.push(`/admin/courses/${courseId}/sections/create`); }

export default (
  ({ courseId }) => {
    const confirmDeleteDialog = useDialog();
    const menu = useMenu({ confirmDeleteDialog });
    const [{ course }, loading, errors] = useQuery(SECTIONS, { courseId });
    
    return <>
      <AdminView.AppBar>
        <Typography variant="h6">
          <RouteBackBtn path="/admin/courses" />
          Редактирование разделов: {course?.name}
          <RefreshBtn queries={[SECTIONS]} />
        </Typography>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/courses">Курсы</Link>
        <Typography color="textPrimary">{course?.name}</Typography>
        <Typography>Структура</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Paper>
        <Loader loading={loading} errors={errors}>
          {course && <Sections {...{ course, menu }} />}
        </Loader>
      </AdminView.Paper>
      <Fab icon={AddIcon} onClick={() => routeToCreateSectionView(courseId)}>
        Создать
      </Fab>

      <MenuModal mgr={menu}>
        {SectionContextMenu}
      </MenuModal>

      <DialogModal mgr={confirmDeleteDialog}>
        {ConfirmDeleteSectionDialog}
      </DialogModal>
    </>;
  }
) |> React.memo(#);