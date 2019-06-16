import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@kemsu/graphql-client';
import { Loader, Link } from '@kemsu/core';
import { SubsectionView as useStyles } from './styles';

export const SUBSECTION = ({ id = 'Int!' }) => `
  subsectionRelease(id: ${id}) {
    id
    name
    units {
      id
      name
      summary
      type
      data
    }
  }
`;

function Subsection({ id }) {
  
  const [tabValue, setTabValue] = useState(0);
  const [{ subsectionRelease: subsection }, loading, errors] = useQuery(SUBSECTION, { id });
  const unit = subsection?.units[tabValue];

  const classes = useStyles();
  return <Paper className={classes.root}>
    <Loader loading={loading} errors={errors}>
      {subsection && subsection.units.length > 0 && <div>
        
        <Tabs className={classes.tabs} value={tabValue} onChange={(event, value) => setTabValue(value)} indicatorColor="primary" textColor="primary">
          {subsection.units.map(({ name }, index) => (
            <Tab className={classes.tab} key={index} label={name} className={classes.tab} />
          ))}
        </Tabs>

        <div className={classes.content}>
          {unit.type === 'TEXT' && <div>
            {unit.data.text}
          </div>}
          {unit.type === 'VIDEO' && <div>
            Сдесь будет видео
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