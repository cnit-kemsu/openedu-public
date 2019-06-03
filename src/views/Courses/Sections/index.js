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
import { useBlockItem } from '../Blocks/useBlockItem';
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

function Sections({ course: { id, sections }, ...props }) {
  const sectionItems = useElementArray(SectionItem, sections, { key: section => section.id, courseId: id, ...props });

  return <List>
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
      createBlockDialog,
      blockMenu,
      blockElements
    ] = useBlockItem();
   
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
          {course && <Sections {...{ course, sectionMenu, createSubsectionDialog, subsectionMenu, createBlockDialog, blockMenu }} />}
        </Loader>
      </AdminView.Div>
      <Fab icon={AddIcon} onClick={createSectionDialog.open}>
        Создать раздел
      </Fab>

      {sectionElements}

      {subsectionElements}

      {blockElements}
    </>;
  }
) |> React.memo(#);