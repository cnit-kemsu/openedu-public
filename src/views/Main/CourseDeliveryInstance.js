import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { History } from '@kemsu/router';
import { useQuery, useMutation, refetch } from '@kemsu/graphql-client';
import { Loader, Link, Notifications, useElementArray, List } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { dispdate } from '@lib/dispdate';
import { CourseDeliveryInstance as useStyles, Section as useSectionStyles, Subsection as useSubsectionStyles } from './styles';
import defaultImage from './default_img.jpg';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Progress from './Progress';
import CourseUsers from './CourseUsers';
import { UserInfo } from '@lib/UserInfo';
import { dispstr } from '@lib/dispstr';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

export const COURSE_DELIVERY_INSTANCE = ({ id = 'Int!' }) => `
  courseDeliveryInstance(id: ${id}) {
    id
    name
    summary
    description
    picture
    price
    startDate
    enrollmentEndDate
    enrolled
    instructors {
      id
      email
      firstname
      lastname
      middlename
      picture
    }
    sections {
      id
      name
      summary
      subsections {
        id
        name
        summary
        accessDate
        expirationDate
      }
    }
  }
`;

const ENROLL_TO_COURSE_DELIVERY_INSTANCE = ({
  id = 'Int!'
}) => `
  enrollToCourseDeliveryInstance(
    courseId: ${id}
  )
`;
function onComplete() {
  refetch(COURSE_DELIVERY_INSTANCE);
  Notifications.push('Вы были успешно записаны на курсы.', 'success');
}

function Subsection({ id, name, summary, sectionIndex, enrolled, index, accessDate, expirationDate }) {

  const isAdmin = UserInfo.role === 'admin' || UserInfo.role === 'superuser';
  const _enrolled = enrolled || isAdmin;
  const nowDate = new Date();
  const access = accessDate ? nowDate > new Date(accessDate) || isAdmin : true;
  //access = expirationDate ? nowDate < new Date(expirationDate) : access;

  const classes = useSubsectionStyles();
  return <div className={classes.root}>
    <ExpansionPanel disabled={!summary} classes={{ disabled: classes.disabled }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ disabled: classes.sumDisabled }}>
        <div>
          {_enrolled
            ? <div>
              {access
                ? <Link className={classes.nameEnrolled} styled path={`/delivery-subsection/${id}`}>
                  <Typography variant="inherit" component="span">{sectionIndex}.{index}. </Typography>
                  <Typography variant="inherit" component="span">
                    {name}
                  </Typography>
                </Link>
                : <div>
                  <Typography variant="inherit" component="span">{sectionIndex}.{index}. </Typography>
                  <Typography variant="inherit" component="span">
                    {name}
                  </Typography>
                </div>
              }
              {accessDate || expirationDate ?
                <div className={classes.dates}>
                  {accessDate && <Typography component="span" variant="inherit">открытие доступа: {dispdate(accessDate)}</Typography>}
                  {accessDate && expirationDate ? <Typography component="span" variant="inherit">, </Typography> : null}
                  {expirationDate && <Typography component="span" variant="inherit">закрытие доступа: {dispdate(expirationDate)}</Typography>}
                </div>  
              : null}
            </div>
            : <div className={classes.name}><Typography component="span" variant="inherit">{sectionIndex}.{index}. </Typography><Typography variant="inherit" component="span">{name}</Typography></div>
          }
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography className={classes.summary}>{summary}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>;
}

function renderSubsection(props, index, sectionIndex, enrolled) {
  return <Subsection key={props.id} index={index} sectionIndex={sectionIndex} enrolled={enrolled} {...props} />;
}

function Section({ name, summary, index, subsections, enrolled }) {

  const classes = useSectionStyles();
  return <div className={classes.root}>
    <div className={classes.header}>
      <ExpansionPanel disabled={!summary} classes={{ disabled: classes.disabled }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ disabled: classes.sumDisabled }}>
          <div className={classes.name}>
            <Typography component="span" variant="inherit">{index}. </Typography>
            <Typography component="span" variant="inherit">{name}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.summary}>{summary}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    <div>
      {subsections.map((props, _index) => renderSubsection(props, _index + 1, index, enrolled))}
    </div>
  </div>;
}

function renderSection(props, index, enrolled) {
  return <Section key={props.id} index={index} enrolled={enrolled} {...props} />;
}

function handleTabChange(id, value) {
  if (value === 0) History.push(`/course-delivery/${id}`);
  if (value === 1) History.push(`/course-delivery/${id}/content`);
  if (value === 2) History.push(`/course-delivery/${id}/progress`);
}

// export const USERS = ({ keys = 'JSON' }) => `
//   users(keys: ${keys}) {
//     id
//     email
//     firstname
//     lastname
//     middlename
//     picture
//   }
// `;

// function Instructors({ keys }) {

//   const [{ users }, loading, errors] = useQuery(USERS, { keys });
//   const userItems = useElementArray(UserItem, users, { key: user => user.id });
//   return <Loader loading={loading} errors={errors}>
//     {users && <List>
//       {userItems}
//     </List>}
//   </Loader>;
// }

function Instructors({ instructors }) {

  const userItems = useElementArray(UserItem, [...instructors], { key: user => user.id });
  return <List>
    {userItems}
  </List>;
}

function UserItem({ id, email, firstname, lastname, middlename, picture }) {

  return <ListItem>
    <ListItemAvatar>{
      picture
      ? <Avatar src={'/files/' + picture.fileSourceKey} />
      : <Avatar><AccountCircle /></Avatar>
    }</ListItemAvatar>
    <ListItemText primary={email} secondary={dispstr(firstname, lastname, middlename)} />
  </ListItem>;
}


function CourseDeliveryInstance({ id, showType, userId }) {
  
  const [{ courseDeliveryInstance }, loading, errors] = useQuery(COURSE_DELIVERY_INSTANCE, { id });
  const enrollToCourseDeliveryInstance = useMutation(ENROLL_TO_COURSE_DELIVERY_INSTANCE, { onComplete }, { id });
  const tabValue = showType === 'content' ? 1 : (showType === 'progress' ? 2 : 0);

  const classes = useStyles();
  return <Paper className={classes.root}>
    <Loader loading={loading} errors={errors}>
      {courseDeliveryInstance && <div>

        <div className={classes.header}>
          <div className={classes.headerDesc}>
            <Typography variant="h4">
              {courseDeliveryInstance.name}
            </Typography>
            {courseDeliveryInstance.enrolled 
              ? <Typography variant="h6" color="primary">Вы уже записаны на курс</Typography>
              : (UserInfo.bearer && UserInfo.role === 'student' ? <Button className={classes.enrollButton} color="primary" variant="contained" onClick={() => {
                if (UserInfo.bearer) enrollToCourseDeliveryInstance();
                else History.push('/account/signin');
              }}>Записаться на курс</Button> : null)
            }
          </div>
          {<img className={classes.headerPic} src={courseDeliveryInstance.picture ? ('/files/' + courseDeliveryInstance.picture.fileSourceKey) : defaultImage} /> }
        </div>

        <div className={classes.content}>

          <div className={classes.contentContent}>
            <Tabs variant="fullWidth" className={classes.tabs} indicatorColor="primary" textColor="primary" value={tabValue} onChange={(event, value) => handleTabChange(id, value)}>
              <Tab className={classes.tab} label="Описание" />
              <Tab className={classes.tab} label="Содержание" />
              {(courseDeliveryInstance.enrolled || (UserInfo.role === 'admin' || UserInfo.role === 'superuser' || UserInfo.role === 'instructor')) && <Tab className={classes.tab} label="Достижения" />}
            </Tabs>

            <div className={classes.contentContentContent}>
              {tabValue === 0 && <div>
                {courseDeliveryInstance.description && <Editor editorState={courseDeliveryInstance.description} readOnly={true} />}
                {courseDeliveryInstance.instructors && <>
                  <Typography variant="h5">Ваши преподаватели</Typography>
                  <Instructors instructors={courseDeliveryInstance.instructors} />
                </>}
              </div>}
              
              {tabValue === 1 && <div>
                {courseDeliveryInstance.sections.map((props, index) => renderSection(props, index + 1, courseDeliveryInstance.enrolled))}
              </div>}

              {tabValue === 2 && <div>
                {UserInfo.role === 'student' ? <Progress id={id} userId={userId} /> : <CourseUsers id={id} />}
              </div>}
            </div>
          </div>

          <div className={classes.info}>
            <Typography className={classes.infoHeader}>Информация о курсе</Typography>
            {courseDeliveryInstance.startDate && <div className={classes.infoNode}>
              <Typography className={classes.dateName}>Начало обучения:</Typography>
              <Typography className={classes.dateValue}>{dispdate(courseDeliveryInstance.startDate)}</Typography>
            </div>}
            {courseDeliveryInstance.enrollmentEndDate && <div className={classes.infoNode}>
              <Typography className={classes.dateName}>Окончание регистрации:</Typography>
              <Typography className={classes.dateValue}>{dispdate(courseDeliveryInstance.enrollmentEndDate)}</Typography>
            </div>}
          </div>

        </div>
        
      </div>}
    </Loader>
  </Paper>;
}

export default React.memo(CourseDeliveryInstance);