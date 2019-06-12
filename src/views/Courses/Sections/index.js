import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, Loader, List, Fab, Link } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import RefreshBtn from '@components/RefreshBtn';
import { useSectionItem } from './useSectionItem';
import { useSubsectionItem } from '../Subsections/useSubsectionItem';
import { useUnitItem } from '../Units/useUnitItem';
import SectionItem from './SectionItem';

export const COURSE = ({ courseId = 'Int!' }) => `
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
        delayAccessTime
        accessTimeLimit
        units {
          id
          name
          summary
          type
        }
      }
    }
  }
`;

function Sections({ course: { sections }, ...props }) {
  const sectionItems = useElementArray(SectionItem, sections, props);

  return sections.length > 0 && <List>
    {sectionItems}
  </List>;
}
Sections = React.memo(Sections);

export default (
  ({ courseId }) => {
    const [
      createSectionDialog,
      sectionMenu,
      sectionElements
    ] = useSectionItem(courseId);

    const [
      createSubsectionDialog,
      subsectionMenu,
      subsectionElements
    ] = useSubsectionItem();

    const [
      createUnitDialog,
      unitMenu,
      unitElements
    ] = useUnitItem();
   
    const [{ course }, loading, errors] = useQuery(COURSE, { courseId });
    
    return <>
      <AdminView.AppBar>
        <Typography variant="h6">
          <RouteBackBtn path="/admin/courses" />
          Редактирование содержания курса: {course?.name}
          <RefreshBtn queries={[COURSE]} />
        </Typography>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path="/admin/courses">Курсы</Link>
        <Typography color="textPrimary">{course?.name}</Typography>
        <Typography>Структура</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Div>
        <Loader {...{ loading, errors }}>
          {course && <Sections {...{ course, sectionMenu, createSubsectionDialog, subsectionMenu, createUnitDialog, unitMenu }} />}
        </Loader>
      </AdminView.Div>
      <Fab icon={AddIcon} onClick={createSectionDialog.open}>
        Создать раздел
      </Fab>

      {sectionElements}

      {subsectionElements}

      {unitElements}
    </>;
  }
) |> React.memo(#);