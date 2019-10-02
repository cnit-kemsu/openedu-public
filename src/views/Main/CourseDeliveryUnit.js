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
import SimpleUnit from './SimpleUnit';
import StudentQuiz from './StudentQuiz';

function CourseDeliveryUnit({ id, type }) {
  
  return <>

    {(type === 'DOCUMENT' || type === 'FILE_DOCUMENT' || type === 'VIDEO') && <SimpleUnit id={id} />}
    {type === 'QUIZ' && <div>
      <StudentQuiz id={id} />
    </div>}

  </>;
}

export default React.memo(CourseDeliveryUnit);