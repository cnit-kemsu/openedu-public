import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, useMenu, useDialog, Loader, List, ListNavigator, MenuModal, DialogModal, Fab } from '@kemsu/core';
import { changeOffset, adjustOffset } from '@lib/listnav';
import AdminView from '@components/AdminView';
import RefreshBtn from '@components/RefreshBtn';
import CourseDesignTemplateItem from './ItemView';
import CourseDesignTemplateContextMenu from './ContextMenu';
import ConfirmDeleteCourseDesignTemplateDialog from './ConfirmDeleteDialog';

export const limit = 5;

export const TOTAL_COURSE_DESIGN_TEMPLATES = () => `
  totalCourseDesignTemplates
`;
export const ALL_COURSE_DESIGN_TEMPLATES = ({ offset = 'Int' }) => `
  allCourseDesignTemplates(offset: ${offset}, limit: ${limit}) {
    id
    name
    summary
    picture
  }
`;

function COURSE_DESIGN_TEMPLATES({ offset, menu }) {
  
  const [{ totalCourseDesignTemplates }] = useQuery(TOTAL_COURSE_DESIGN_TEMPLATES);
  adjustOffset(totalCourseDesignTemplates, offset, limit);
  const [{ allCourseDesignTemplates }, loading, errors] = useQuery(ALL_COURSE_DESIGN_TEMPLATES, { offset });
  const courseDesignTemplateItems = useElementArray(CourseDesignTemplateItem, allCourseDesignTemplates, { key: courseDesignTemplate => courseDesignTemplate.id, menu });

  return <Loader loading={loading} errors={errors}>
    {allCourseDesignTemplates && <List>
      {courseDesignTemplateItems}
    </List>}
    {totalCourseDesignTemplates > 0 && <ListNavigator {...{ limit, offset }} total={totalCourseDesignTemplates} onChange={changeOffset} />}
  </Loader>;
}
COURSE_DESIGN_TEMPLATES = React.memo(COURSE_DESIGN_TEMPLATES);

function routeToCreateCourseView() { History.push('/admin/course-design-templates/create'); }

export default (props => {
  const confirmDeleteDialog = useDialog();
  const menu = useMenu({ confirmDeleteDialog });
  
  return <>
    <AdminView.AppBar>
      <Typography variant="h6">
        Список шаблонов курсов
        <RefreshBtn queries={[TOTAL_COURSE_DESIGN_TEMPLATES, ALL_COURSE_DESIGN_TEMPLATES]} />
      </Typography>
    </AdminView.AppBar>
    <AdminView.Breadcrumbs>
      <Typography>Администрирование</Typography>
      <Typography color="textPrimary">Дизайн курсов</Typography>
    </AdminView.Breadcrumbs>
    <AdminView.Paper>
      <COURSE_DESIGN_TEMPLATES {...{ menu, ...props}} />
    </AdminView.Paper>
    <Fab icon={AddIcon} onClick={routeToCreateCourseView}>
      Создать
    </Fab>

    <MenuModal mgr={menu}>
      {CourseDesignTemplateContextMenu}
    </MenuModal>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteCourseDesignTemplateDialog}
    </DialogModal>
  </>;
})
|> React.memo(#);