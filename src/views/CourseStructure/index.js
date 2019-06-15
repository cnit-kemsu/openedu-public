import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, Loader, List, Fab, Link } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import RefreshBtn from '@components/RefreshBtn';
import { useSectionItem } from './useSectionItem';
import { useSubsectionItem } from './Subsections/useSubsectionItem';
import { useUnitItem } from './Subsections/Units/useUnitItem';
import SectionItem from './SectionItem';

export const COURSE = ({ _courseId = 'Int!' }) => `
  course(id: ${_courseId}) {
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

export const COURSE_RELEASE = ({ _courseId = 'Int!' }) => `
  courseRelease(id: ${_courseId}) {
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
        startDate
        endDate
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

function Sections({ _course: { sections }, ...props }) {
  const sectionItems = useElementArray(SectionItem, sections, props);

  return sections.length > 0 && <List>
    {sectionItems}
  </List>;
}
Sections = React.memo(Sections);

export default (
  ({ courseId, releaseId }) => {
    
    const release = courseId === undefined;
    const _courseId = release ? releaseId : courseId;
    const COURSE_QUERY = release ? COURSE_RELEASE : COURSE;
    const routeBackPath = release ? '/admin/releases' : '/admin/courses';

    const [
      createSectionDialog,
      sectionMenu,
      sectionElements
    ] = useSectionItem(_courseId, release);

    const [
      createSubsectionDialog,
      subsectionMenu,
      subsectionElements
    ] = useSubsectionItem(release);

    const [
      createUnitDialog,
      unitMenu,
      unitElements
    ] = useUnitItem(release);
   
    const [{ [release ? 'courseRelease' : 'course']: _course }, loading, errors] = useQuery(COURSE_QUERY, { _courseId });
    
    return <>
      <AdminView.AppBar>
        <Typography variant="h6">
          <RouteBackBtn path={routeBackPath} />
          Редактирование содержания {release ? 'выпуска' : 'курса'}: {_course?.name}
          <RefreshBtn queries={[COURSE_QUERY]} />
        </Typography>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path={routeBackPath}>{release ? 'Выпуски' : 'Курсы'}</Link>
        <Typography color="textPrimary">{_course?.name}</Typography>
        <Typography>Структура</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Div>
        <Loader {...{ loading, errors }}>
          {_course && <Sections {...{ _course, release, sectionMenu, createSubsectionDialog, subsectionMenu, createUnitDialog, unitMenu }} />}
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