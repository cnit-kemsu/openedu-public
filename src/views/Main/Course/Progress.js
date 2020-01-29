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
import { UserInfo } from '@lib/UserInfo';

export const PROGRESS = ({ id = 'Int!' }) => `
  progress(courseId: ${id}) {
    certificateAvailable
    units {
      unitName
      score
      maxScore
    }
  }
`;

const SEND_SERTIFICATE = ({ id = 'Int!' }) => `
  sendSertificate(courseId: ${id})
`;

function SingleStudentProgress({ progress, sendSertificate }) {
  const { units, certificateAvailable } = progress[0];

  let allScores = 0;
  let maxAllScores = 0;
  if (units) for (const unitProgress of units) {
    //if (!unitProgress.finalCertification) continue;
    allScores += unitProgress.score;
    maxAllScores += unitProgress.maxScore;
  }
  
  return <div>
    <Typography variant="h6">Баллы за тесты</Typography>
    {units.map(
      (unitProgress, index) => <div key={index}>
        <Typography style={{ paddingTop: '12px' }} variant="h6">{unitProgress.unitName}: {unitProgress.score == null ? 'не было попыток' : `${unitProgress.score} из ${unitProgress.maxScore}`}</Typography>
      </div>
    )}

    {sendSertificate && <>
      <Divider style={{ marginTop: '12px' }} />
      <div>
        <Typography style={{ paddingTop: '12px', display: 'inline-block', marginRight: '12px' }} variant="h6">Всего: {allScores} из {maxAllScores}</Typography>
        <div>
          {certificateAvailable && <Button onClick={() => sendSertificate()} variant="outlined" color="primary">Прислать сертификат на почту</Button>}
        </div>
      </div>
    </>}
    
  </div>;
}
SingleStudentProgress = React.memo(SingleStudentProgress);

function MultipleStudentsProgress({ progress }) {
  console.log('123');
  return <div>asd111</div>;
}
MultipleStudentsProgress = React.memo(MultipleStudentsProgress);

function Progress({ id }) {
  
  const [{ progress }, loading, errors] = useQuery(PROGRESS, { id });
  const sendSertificate = useMutation(SEND_SERTIFICATE, {}, { id });

  // let allScores = 0;
  // let maxAllScores = 0;
  // if (units) for (const progress of units) {
  //   if (!progress.quiz.finalCertification) continue;
  //   allScores += progress.score;
  //   maxAllScores += progress.quiz.maxScore;
  // }

  return <Loader loading={loading} errors={errors}>
    {progress !== undefined && <div>

      {UserInfo.role === 'student' && <SingleStudentProgress progress={progress} sendSertificate={sendSertificate} />}
      {UserInfo.role !== 'student' && <MultipleStudentsProgress progress={progress} />}
      {/* <Typography variant={userId ? 'h6' : 'h4'}>Баллы за тесты</Typography>
      {units.map(
        (progress, index) => <div key={index}>
          <Typography style={{ paddingTop: '12px' }} variant={userId ? undefined : 'h6'}>{progress.unitName}: {progress.score == null ? 'не было попыток' : `${progress.score} из ${progress.quiz.maxScore}`}</Typography>
        </div>
      )}

      <Divider style={{ marginTop: '12px' }} />
      <div>
        <Typography style={{ paddingTop: '12px', display: 'inline-block', marginRight: '12px' }} variant={userId ? undefined : 'h6'}>Всего: {allScores} из {maxAllScores}</Typography>
        {certificateAvailable && <Button onClick={() => sendSertificate()} variant="outlined" color="primary">Прислать сертификат на почту</Button>}
      </div> */}

    </div>}
  </Loader>;
}

// function Progress({ id, userId }) {
  
//   const [{ progress } = {}, loading, errors] = useQuery(PROGRESS, { id });
//   const sendSertificate = useMutation(SEND_SERTIFICATE, {}, { id });
//   if (UserInfo.role === 'student') return <StudentProgress progress={progress} />
//   let allScores = 0;
//   let maxAllScores = 0;
//   if (units) for (const progress of units) {
//     if (!progress.quiz.finalCertification) continue;
//     allScores += progress.score;
//     maxAllScores += progress.quiz.maxScore;
//   }

//   return <Loader loading={loading} errors={errors}>
//     {units && <div>

//       <Typography variant={userId ? 'h6' : 'h4'}>Баллы за тесты</Typography>
//       {units.map(
//         (progress, index) => <div key={index}>
//           <Typography style={{ paddingTop: '12px' }} variant={userId ? undefined : 'h6'}>{progress.unitName}: {progress.score == null ? 'не было попыток' : `${progress.score} из ${progress.quiz.maxScore}`}</Typography>
//         </div>
//       )}

//       <Divider style={{ marginTop: '12px' }} />
//       <div>
//         <Typography style={{ paddingTop: '12px', display: 'inline-block', marginRight: '12px' }} variant={userId ? undefined : 'h6'}>Всего: {allScores} из {maxAllScores}</Typography>
//         {certificateAvailable && <Button onClick={() => sendSertificate()} variant="outlined" color="primary">Прислать сертификат на почту</Button>}
//       </div>

//     </div>}
//   </Loader>;
// }

export default React.memo(Progress);