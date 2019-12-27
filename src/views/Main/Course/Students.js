import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@kemsu/graphql-client';
import { Loader, Link, useDialog, DialogModal, Dialog } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { SubsectionView as useStyles } from './styles';
import RouteBackBtn from '@components/RouteBackBtn';
import { dispstr } from '@lib/dispstr';
import Progress from './Progress';

export const COURSE_DELIVERY_STUDENTS = ({ id = 'Int!' }) => `
  courseDeliveryStudents(courseId: ${id}) {
    id,
    lastname
    firstname
    middlename
    email
    picture
  }
`;

function UserProgressDialog(close, { id, userId, email, firstname, lastname, middlename }) {
  return <Dialog onClose={close} title="Достижения пользователя">
    <div style={{ width: '400px' }}>
      <Typography style={{ paddingBottom: '24px' }}>
        {email}, {dispstr(firstname, lastname, middlename)}
      </Typography>
      <Progress {...{ id, userId }} />
    </div>
  </Dialog>;
}

function CourseUsers({ id }) {
  
  const [{ courseDeliveryStudents }, loading, errors] = useQuery(COURSE_DELIVERY_STUDENTS, { id });
  const dialog = useDialog({ id });

  return <Loader loading={loading} errors={errors}>
    {courseDeliveryStudents && <List>

      {courseDeliveryStudents.map(
        ({ id: userId, email, firstname, lastname, middlename, picture }, index) => <ListItem key={index}>
          <ListItemAvatar>{
            picture
            ? <Avatar src={'/files/' + picture.fileSourceKey} />
            : <Avatar><AccountCircle /></Avatar>
          }</ListItemAvatar>
          <ListItemText primary={email} secondary={<>
              {dispstr(firstname, lastname, middlename) + ' '}
              <span style={{ cursor: 'pointer', color: '#3f51b5' }} onClick={() => dialog.open({ userId, email, firstname, lastname, middlename })}>посмотреть</span>
            </>} />
          
        </ListItem>
      )}

    <DialogModal mgr={dialog}>
      {UserProgressDialog}
    </DialogModal>

    </List>}
  </Loader>;
}

export default React.memo(CourseUsers);