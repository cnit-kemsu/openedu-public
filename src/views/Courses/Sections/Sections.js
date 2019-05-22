import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, MenuModal, DialogModal, Fab, Link } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import RefreshBtn from '@components/RefreshBtn';
import SectionItem from './SectionItem';
import SectionContextMenu from './SectionContextMenu';
import CreateSectionDialog from './CreateSectionDialog';
import EditSectionDialog from './EditSectionDialog';
import ConfirmDeleteSectionDialog from './ConfirmDeleteSectionDialog';

import SubsectionContextMenu from '../Subsections/SubsectionContextMenu';
import CreateSubsectionDialog from '../Subsections/CreateSubsectionDialog';
import EditSubsectionDialog from '../Subsections/EditSubsectionDialog';
import ConfirmDeleteSubsectionDialog from '../Subsections/ConfirmDeleteSubsectionDialog';

import BlockContextMenu from '../Blocks/BlockContextMenu';
import CreateBlockDialog from '../Blocks/CreateBlockDialog';
import EditBlockDialog from '../Blocks/EditBlockDialog';
import ConfirmDeleteBlockDialog from '../Blocks/ConfirmDeleteBlockDialog';

export const SECTIONS = ({ courseId = 'Int!' }) => `
  course(id: ${courseId}) {
    id
    name
    sections {
      id
      name
      summary
      subsections {
        id
        name
        summary
        blocks {
          id
          name
          summary
          type
        }
      }
    }
  }
`;

function Sections({ course: { id, sections }, menu, subsectionsMenu, createSubsectionDialog, createBlockDialog, blocksMenu }) {
  const sectionItems = useElementArray(SectionItem, sections, { key: section => section.id, menu, subsectionsMenu, createSubsectionDialog, createBlockDialog, blocksMenu, courseId: id });

  return <List>
    {sectionItems}
  </List>;
}
Sections = React.memo(Sections);

export default (
  ({ courseId }) => {
    const createDialog = useDialog({ courseId });
    const editDialog = useDialog();
    const confirmDeleteDialog = useDialog();
    const menu = useMenu({ editDialog, confirmDeleteDialog });

    const createSubsectionDialog = useDialog();
    const editSubsectionDialog = useDialog();
    const confirmDeleteSubsectionDialog = useDialog();
    const subsectionsMenu = useMenu({ editDialog: editSubsectionDialog, confirmDeleteDialog: confirmDeleteSubsectionDialog });

    const createBlockDialog = useDialog();
    const editBlockDialog = useDialog();
    const confirmDeleteBlockDialog = useDialog();
    const blocksMenu = useMenu({ editDialog: editBlockDialog, confirmDeleteDialog: confirmDeleteBlockDialog });
    
    const [{ course }, loading, errors] = useQuery(SECTIONS, { courseId });
    
    return <>
      <AdminView.AppBar>
        <Typography variant="h6">
          <RouteBackBtn path="/admin/courses" />
          Редактирование содержания курса: {course?.name}
          <RefreshBtn queries={[SECTIONS]} />
        </Typography>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/courses">Курсы</Link>
        <Typography color="textPrimary">{course?.name}</Typography>
        <Typography>Структура</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Div>
        <Loader loading={loading} errors={errors}>
          {course && <Sections {...{ course, menu, subsectionsMenu, createSubsectionDialog, createBlockDialog, blocksMenu }} />}
        </Loader>
      </AdminView.Div>
      <Fab icon={AddIcon} onClick={createDialog.open}>
        Создать раздел
      </Fab>

      <MenuModal mgr={menu}>
        {SectionContextMenu}
      </MenuModal>

      <DialogModal mgr={createDialog}>
        {CreateSectionDialog}
      </DialogModal>

      <DialogModal mgr={editDialog}>
        {EditSectionDialog}
      </DialogModal>

      <DialogModal mgr={confirmDeleteDialog}>
        {ConfirmDeleteSectionDialog}
      </DialogModal>

      <MenuModal mgr={subsectionsMenu}>
        {SubsectionContextMenu}
      </MenuModal>

      <DialogModal mgr={createSubsectionDialog}>
        {CreateSubsectionDialog}
      </DialogModal>

      <DialogModal mgr={editSubsectionDialog}>
        {EditSubsectionDialog}
      </DialogModal>

      <DialogModal mgr={confirmDeleteSubsectionDialog}>
        {ConfirmDeleteSubsectionDialog}
      </DialogModal>

      <MenuModal mgr={blocksMenu}>
        {BlockContextMenu}
      </MenuModal>

      <DialogModal mgr={createBlockDialog}>
        {CreateBlockDialog}
      </DialogModal>

      <DialogModal mgr={editBlockDialog}>
        {EditBlockDialog}
      </DialogModal>

      <DialogModal mgr={confirmDeleteBlockDialog}>
        {ConfirmDeleteBlockDialog}
      </DialogModal>
    </>;
  }
) |> React.memo(#);