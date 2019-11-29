import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery, useMutation } from '@kemsu/graphql-client';
import { Loader, Link } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { SubsectionView as useStyles } from './styles';
import RouteBackBtn from '@components/RouteBackBtn';

export const COURSE_DELIVERY_PROGRESS = ({ id = 'Int!', userId = 'Int' }) => `
  courseDeliveryInstanceUserProgress(courseId: ${id} userId: ${userId}) {
    certificateAvailable
    units {
      unitName
      score
      quiz
    }
  }
`;

const SEND_SERTIFICATE = ({ id = 'Int!' }) => `
  sendSertificate(courseId: ${id})
`;

function Progress({ id, userId }) {
  
  const [{ courseDeliveryInstanceUserProgress: { units, certificateAvailable } = {} } = {}, loading, errors] = useQuery(COURSE_DELIVERY_PROGRESS, { id, userId });
  const sendSertificate = useMutation(SEND_SERTIFICATE, {}, { id });
  let allScores = 0;
  let maxAllScores = 0;
  if (units) for (const progress of units) {
    if (!progress.quiz.finalCertification) continue;
    allScores += progress.score;
    maxAllScores += progress.quiz.maxScore;
  }

  return <Loader loading={loading} errors={errors}>
    {units && <div>

      <Typography variant={userId ? 'h6' : 'h4'}>Баллы за тесты</Typography>
      {units.map(
        (progress, index) => <div key={index}>
          <Typography style={{ paddingTop: '12px' }} variant={userId ? undefined : 'h6'}>{progress.unitName}: {progress.score == null ? 'не было попыток' : `${progress.score} из ${progress.quiz.maxScore}`}</Typography>
        </div>
      )}

      <Divider style={{ marginTop: '12px' }} />
      <div>
        <Typography style={{ paddingTop: '12px', display: 'inline-block', marginRight: '12px' }} variant={userId ? undefined : 'h6'}>Всего: {allScores} из {maxAllScores}</Typography>
        {certificateAvailable && <Button onClick={() => sendSertificate()} variant="outlined" color="primary">Прислать сертификат на почту</Button>}
      </div>

    </div>}
  </Loader>;
}

export default React.memo(Progress);