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

import { Mutation, refetch } from '@kemsu/graphql-client';
import { ConfirmDialog, Notifications } from '@kemsu/core';
import confirmDeleteProps from '@components/confirmDeleteProps';
import DialogContentText from '@material-ui/core/DialogContentText';

export const PROGRESS = ({ id = 'Int!' }) => `
  progress(courseId: ${id}) {
    certificateAvailable
    units {
      id
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

const DELETE_ATTEMPT = ({ userId = 'Int!', unitId = 'Int!' }) => `
  deleteQuizAttempt(userId: ${userId} unitId: ${unitId})
`;
function onComplete() {
  refetch(PROGRESS);
  Notifications.push('Попытка была успешно удалена.', 'success');
}
const deleteAttempt = new Mutation(DELETE_ATTEMPT, { onComplete }).commit;

export function ConfirmDeleteAttemptDialog(close, { userId, unitId }) {
  
  return <ConfirmDialog onClose={close} onConfirm={() => deleteAttempt({ userId, unitId })} title="Удаление попытка" {...confirmDeleteProps}>
    <DialogContentText>
      Вы действительно хотите удалить попытку?
    </DialogContentText>
  </ConfirmDialog>;
}

function SingleStudentProgress({ progress, userId, sendSertificate }) {
  const { units, certificateAvailable } = progress[0];
  const confirmDeleteDialog = useDialog();

  let allScores = 0;
  let maxAllScores = 0;
  if (units) for (const unitProgress of units) {
    //if (!unitProgress.finalCertification) continue;
    allScores += unitProgress.score;
    maxAllScores += unitProgress.maxScore;
  }
  
  return <div>
    <Typography style={{ marginBottom: '12px' }} variant="h6">Баллы за тесты</Typography>
    <table><tbody>
      {units.map(
        (unitProgress, index) => <tr key={index}>
          <td style={{ paddingRight: '36px', paddingTop: '12px' }}>
            <Typography>{unitProgress.unitName}</Typography>
          </td>
          <td style={{ paddingRight: '24px', paddingTop: '12px', minWidth: '300px' }}>
            <Typography style={{
              color: unitProgress.score != null ? '#3f51b5' : amber[700]
            }}>{unitProgress.score == null ? 'Еще не было попыток' : `${unitProgress.score} из ${unitProgress.maxScore}`}</Typography>
          </td>
          {UserInfo.role !== 'student' && <td><Button variant="outlined" color="primary" onClick={() => { close(); confirmDeleteDialog.open({ userId, unitId: unitProgress.id }); }}>Удалить</Button></td>}
        </tr>
      )}
    </tbody></table>

    <Divider style={{ marginTop: '24px' }} />
    <div>
      <Typography style={{ paddingTop: '12px', display: 'inline-block', marginRight: '12px' }} variant="h6">Всего: {allScores} из {maxAllScores}</Typography>
      <div>
        {UserInfo.role === 'student' && <Button size="small" disabled={!certificateAvailable} onClick={() => sendSertificate()} style={{ marginTop: '12px' }} variant="outlined" color="primary">Прислать сертификат на почту</Button>}
      </div>
    </div>

    <DialogModal mgr={confirmDeleteDialog}>
      {ConfirmDeleteAttemptDialog}
    </DialogModal>
    
  </div>;
}
SingleStudentProgress = React.memo(SingleStudentProgress);

function UserProgressDialog(close, { id, progress, email, firstname, lastname, middlename }) {
  return <Dialog onClose={close} title="Достижения пользователя">
    <div style={{ width: '1000px' }}>
      <Typography style={{ paddingBottom: '24px', marginTop: '-12px'  }}>
        {email}, {dispstr(lastname, firstname, middlename)}
      </Typography>
      <SingleStudentProgress {...{ progress, userId: id }} />
    </div>
  </Dialog>;
}

function MultipleStudentsProgress({ progress }) {
  const dialog = useDialog();

  return <div>
    
    <List>

      {progress.map(
        ({ units, certificateAvailable, userData: { id, firstname, lastname, middlename, picture, email, maxAllScores, allScores } }, index) => <ListItem key={index}>

          <ListItemAvatar>{
            picture
            ? <Avatar src={'/files/' + picture.fileSourceKey} />
            : <Avatar><AccountCircle /></Avatar>
          }</ListItemAvatar>

          <ListItemText primary={email} secondary={<>
            {dispstr(lastname, firstname, middlename) + ' '}
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
              
            }} size="small" color="primary" variant="outlined" onClick={() => dialog.open({ id, email, firstname, lastname, middlename, progress: [{ units, certificateAvailable }] })}>подробнее</Button>
          </div>
          
        </ListItem>
      )}

      <DialogModal mgr={dialog} maxWidth={false}>
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