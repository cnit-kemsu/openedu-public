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

import { dispstr } from '@lib/dispstr';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { useDialog, DialogModal, Dialog } from '@kemsu/core';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

export const PROGRESS = ({ id = 'Int!' }) => `
  progress(courseId: ${id}) {
    certificateAvailable
    units {
      unitName
      score
      maxScore
    }
    userData
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
    <Typography style={{ marginBottom: '12px' }} variant="h6">Баллы за тесты</Typography>
    {units.map(
      (unitProgress, index) => <div key={index}>
        <Typography style={{ paddingTop: '12px' }}>{unitProgress.unitName}: {unitProgress.score == null ? 'не было попыток' : `${unitProgress.score} из ${unitProgress.maxScore}`}</Typography>
      </div>
    )}

    <Divider style={{ marginTop: '24px' }} />
    <div>
      <Typography style={{ paddingTop: '12px', display: 'inline-block', marginRight: '12px' }} variant="h6">Всего: {allScores} из {maxAllScores}</Typography>
      <div>
        {UserInfo.role === 'student' && <Button size="small" disabled={!certificateAvailable} onClick={() => sendSertificate()} style={{ marginTop: '12px' }} variant="outlined" color="primary">Прислать сертификат на почту</Button>}
      </div>
    </div>
    
  </div>;
}
SingleStudentProgress = React.memo(SingleStudentProgress);

function UserProgressDialog(close, { progress, email, firstname, lastname, middlename }) {
  return <Dialog onClose={close} title="Достижения пользователя">
    <div style={{ width: '400px' }}>
      <Typography style={{ paddingBottom: '24px', marginTop: '-12px',  }}>
        {email}, {dispstr(firstname, lastname, middlename)}
      </Typography>
      <SingleStudentProgress {...{ progress }} />
    </div>
  </Dialog>;
}

function MultipleStudentsProgress({ progress }) {
  const dialog = useDialog();

  return <div>
    
    <List>

      {progress.map(
        ({ units, certificateAvailable, userData: { firstname, lastname, middlename, picture, email, maxAllScores, allScores } }, index) => <ListItem key={index}>

          <ListItemAvatar>{
            picture
            ? <Avatar src={'/files/' + picture.fileSourceKey} />
            : <Avatar><AccountCircle /></Avatar>
          }</ListItemAvatar>

          <ListItemText primary={email} secondary={<>
            {dispstr(firstname, lastname, middlename) + ' '}
          </>} />

          <div style={{
            display: 'flex',
            width: '100%',
            width: '350px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography style={{ fontSize: '14px' }}>Всего баллов: {allScores} из {maxAllScores}</Typography>
            <Typography style={{
              color: certificateAvailable ? green[600] : amber[700],
              fontSize: '14px'
            }}>{certificateAvailable ? 'Закончил' : 'Не закончил'}</Typography>
            <Button style={{
              padding: '6px',
              fontSize: '12px'
              
            }} size="small" color="primary" variant="outlined" onClick={() => dialog.open({ email, firstname, lastname, middlename, progress: [{ units, certificateAvailable }] })}>подробнее</Button>
          </div>
          
        </ListItem>
      )}

      <DialogModal mgr={dialog}>
        {UserProgressDialog}
      </DialogModal>

    </List>
    
  </div>;
}
MultipleStudentsProgress = React.memo(MultipleStudentsProgress);

function Progress({ id }) {
  
  const [{ progress }, loading, errors] = useQuery(PROGRESS, { id });
  const sendSertificate = useMutation(SEND_SERTIFICATE, {}, { id });

  return <Loader loading={loading} errors={errors}>
    {progress !== undefined && <div>

      {UserInfo.role === 'student' && <SingleStudentProgress progress={progress} sendSertificate={sendSertificate} />}
      {UserInfo.role !== 'student' && <MultipleStudentsProgress progress={progress} />}

    </div>}
  </Loader>;
}

export default React.memo(Progress);