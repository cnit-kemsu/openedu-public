import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@kemsu/graphql-client';
import { Loader, Link } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { SubsectionView as useStyles } from './styles';
import RouteBackBtn from '@components/RouteBackBtn';
import RouteNextBtn from '@components/RouteNextBtn';
import CourseDeliveryUnit from './CourseDeliveryUnit';

export const SUBSECTION_DELIVERY = ({ id = 'Int!' }) => `
  subsectionDelivery: courseDeliverySubsection(id: ${id}) {
    id
    name
    previousSubsectionId
        nextSubsectionId
    units {
      id
      name
      type
    }
    section {
      name
      course {
        name
        id
      }
    }
  }
`;

function Subsection({ id }) {
  
  const [tabValue, setTabValue] = useState(0);
  const [{ subsectionDelivery }, loading, errors] = useQuery(SUBSECTION_DELIVERY, { id });
  const unit = subsectionDelivery?.units[tabValue];

  const classes = useStyles();
  return <div>
    <div className={classes.header}>
      <Typography variant="h3">{subsectionDelivery?.section?.course?.name}</Typography>
      {subsectionDelivery?.section?.name !== '0' && <Typography variant="h4">{subsectionDelivery?.section?.name}</Typography>}
      <Typography variant="h5">{subsectionDelivery?.name}</Typography>
    </div>
    <Paper className={classes.root}>
      <Loader loading={loading} errors={errors}>
        {subsectionDelivery && <div>

          <div>
            <div className={classes.topBar}>
              <RouteBackBtn path={`/course-delivery/${subsectionDelivery.section.course.id}/content`} />
              <Typography>Назад к содержанию</Typography>
            </div>
          </div>

          <div className={classes.navNextBack}>
            <div className={classes.previousSubsectionButton}>
              <RouteBackBtn disabled={subsectionDelivery.previousSubsectionId == null} path={`/delivery-subsection/${subsectionDelivery.previousSubsectionId}`} />
              <Typography>Предыдущий подраздел</Typography>
            </div>
            <div className={classes.nextSubsectionButton}>
              <Typography>Следующий подраздел</Typography>
              <RouteNextBtn disabled={subsectionDelivery.nextSubsectionId == null} path={`/delivery-subsection/${subsectionDelivery.nextSubsectionId}`} />
            </div>
          </div>

          {subsectionDelivery.units.length > 0 && <div>

            <Tabs variant="fullWidth" className={classes.tabs} value={tabValue} onChange={(event, value) => setTabValue(value)} indicatorColor="primary" textColor="primary">
              {subsectionDelivery.units.map(({ name }, index) => (
                <Tab className={classes.tab} key={index} label={name} />
              ))}
            </Tabs>

            <div className={classes.content}>
              <CourseDeliveryUnit id={unit.id} type={unit.type} />
            </div>
          
          </div> || <div style={{ textAlign: 'center' }}><Typography>Пусто</Typography></div>}
          
        </div>}
      </Loader>
    </Paper>
  </div>;
}

export default React.memo(Subsection);