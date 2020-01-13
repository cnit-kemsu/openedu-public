import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@kemsu/graphql-client';
import { Loader, Link } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { SubsectionView as useStyles } from '../styles';
import RouteBackBtn from '@components/RouteBackBtn';
import RouteNextBtn from '@components/RouteNextBtn';
import CourseDeliveryUnit from '../CourseDeliveryUnit';
import Header from './Header';

export const SUBSECTION_DELIVERY = ({ id = 'Int!' }) => `
  courseDeliverySubsection(id: ${id}) {
    id
    name
    previousSubsectionId
    nextSubsectionId
    units {
      id
      name
      type
      previousUnitId
      nextUnitId
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
  const [{ courseDeliverySubsection: subsection }, loading, errors] = useQuery(SUBSECTION_DELIVERY, { id });
  const unit = subsection?.units[tabValue];

  const classes = useStyles();
  return <div>
      {subsection != null && <>
        <Header subsection={subsection} />
      </>}
    
      <Loader loading={loading} errors={errors}>
        {subsection && <div>


          {subsection.units.length > 0 && <div>


            <div className={classes.content}>
              <CourseDeliveryUnit id={unit.id} type={unit.type} />
            </div>
          
          </div> || <div style={{ textAlign: 'center' }}><Typography>Пусто</Typography></div>}
          
        </div>}
      </Loader>
  </div>;
}

export default React.memo(Subsection);