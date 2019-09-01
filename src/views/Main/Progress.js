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

export const COURSE_DELIVERY_PROGRESS = ({ id = 'Int!' }) => `
  courseDeliveryInstanceUserProgress(courseDeliveryInstanceId: ${id}) {
    unitName
    score
    quiz
  }
`;

function Progress({ id }) {
  
  const [{ courseDeliveryInstanceUserProgress }, loading, errors] = useQuery(COURSE_DELIVERY_PROGRESS, { id });

  return <Loader loading={loading} errors={errors}>
    {courseDeliveryInstanceUserProgress && <div>

      <Typography variant="h4">Баллы за тесты</Typography>
      {courseDeliveryInstanceUserProgress.map(
        progress => <div>
          <Typography variant="h6">{progress.unitName}: {progress.score} из {progress.quiz.maxScore}</Typography>
        </div>
      )}

    </div>}
  </Loader>;
}

export default React.memo(Progress);