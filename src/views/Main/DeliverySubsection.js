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

export const SUBSECTION_DELIVERY = ({ id = 'Int!' }) => `
  subsectionDelivery(id: ${id}) {
    id
    name
    units {
      id
      name
      summary
      type
      data
    }
    section {
      course {
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
  return <Paper className={classes.root}>
    <Loader loading={loading} errors={errors}>
      {subsectionDelivery && subsectionDelivery.units.length > 0 && <div>

        <div className={classes.topBar}>
          <RouteBackBtn path={`/course-delivery/${subsectionDelivery.section.course.id}/content`} />
          <Typography>Назад к содержанию</Typography>
        </div>
        
        <Tabs variant="fullWidth" className={classes.tabs} value={tabValue} onChange={(event, value) => setTabValue(value)} indicatorColor="primary" textColor="primary">
          {subsectionDelivery.units.map(({ name }, index) => (
            <Tab className={classes.tab} key={index} label={name} />
          ))}
        </Tabs>

        <div className={classes.content}>
          {unit.type === 'DOCUMENT' && <div>
            <Editor editorState={unit.data} readOnly={true} />
          </div>}
          {unit.type === 'VIDEO' && <div>
            <iframe width="704px" height="480px" src={unit.data.url} sandbox frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>}
          {unit.type === 'QUIZ' && <div>
            Сдесь будет тест
          </div>}
        </div>

      </div>}
    </Loader>
  </Paper>;
}

export default React.memo(Subsection);