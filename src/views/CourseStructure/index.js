import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ExpandIcon from '@material-ui/icons/AddCircle';
import CollapseIcon from '@material-ui/icons/RemoveCircle';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, Loader, List, Fab, Link } from '@kemsu/core';
import AdminView from '@components/AdminView';
import RouteBackBtn from '@components/RouteBackBtn';
import RefreshBtn from '@components/RefreshBtn';
import { ExpansionContext } from '@components/ExpansionPanel';
import { useSectionItem } from './useSectionItem';
import { useSubsectionItem } from './Subsections/useSubsectionItem';
import { useUnitItem } from './Subsections/Units/useUnitItem';
import SectionItem from './SectionItem';
import useStyles from './styles';

export const COURSE_DESIGN_TEMPLATE = ({ _courseId = 'Int!' }) => `
  courseDesignTemplate(id: ${_courseId}) {
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
        accessPeriod
        expirationPeriod
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

export const COURSE_DELIVERY_INSTANCE = ({ _courseId = 'Int!' }) => `
  courseDeliveryInstance(id: ${_courseId}) {
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
        accessDate
        expirationDate
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

const expandAll = () => ExpansionContext.expandAll('course-structure');
const collapseAll = () => ExpansionContext.collapseAll('course-structure');

export default (
  ({ courseDesignTemplateId, courseDeliveryInstanceId }) => {
    
    const isDelivery = courseDesignTemplateId === undefined;
    const _courseId = isDelivery ? courseDeliveryInstanceId : courseDesignTemplateId;
    const COURSE_QUERY = isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE;
    const routeBackPath = isDelivery ? '/admin/course-delivery-instances' : '/admin/course-design-templates';

    const [
      createSectionDialog,
      sectionMenu,
      sectionElements
    ] = useSectionItem(_courseId, isDelivery);

    const [
      createSubsectionDialog,
      subsectionMenu,
      subsectionElements
    ] = useSubsectionItem(isDelivery);

    const [
      createUnitDialog,
      unitMenu,
      unitElements
    ] = useUnitItem(isDelivery);
   
    const [{ [isDelivery ? 'courseDeliveryInstance' : 'courseDesignTemplate']: _course }, loading, errors] = useQuery(COURSE_QUERY, { _courseId });
    
    const classes = useStyles();
    return <>
      <AdminView.AppBar>
        <Typography variant="h6">
          <RouteBackBtn path={routeBackPath} />
          Редактирование содержания {isDelivery ? 'экземпляра курса' : 'шаблона курса'}: {_course?.name}
          <RefreshBtn queries={[COURSE_QUERY]} />
        </Typography>
      </AdminView.AppBar>
      <AdminView.Breadcrumbs>
        <Typography>Администрирование</Typography>
        <Link styled path={routeBackPath}>{isDelivery ? 'Реализация курсов ' : 'Дизайн курсов'}</Link>
        <Typography color="textPrimary">{_course?.name}</Typography>
        <Typography>Структура</Typography>
      </AdminView.Breadcrumbs>
      <AdminView.Div>
        <Loader {...{ loading, errors }}>
          <div className={classes.expandCollapseContainer}>
            <Button color="primary" variant="outlined" onClick={expandAll}>Развернуть все <ExpandIcon color="primary" /></Button>
            <Button color="primary" variant="outlined" onClick={collapseAll}>Свернуть все <CollapseIcon color="primary" /></Button>
          </div>
          {_course && <Sections {...{ _course, isDelivery, sectionMenu, createSubsectionDialog, subsectionMenu, createUnitDialog, unitMenu }} />}
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