import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useQuery, useMutation, refetch } from '@kemsu/graphql-client';
import { Loader, Link, Notifications, useElementArray, List } from '@kemsu/core';
import useStyles from './styles';

import Header from './Header';
import Description from './Description';

// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Button from '@material-ui/core/Button';
// import { History } from '@kemsu/router';
// 
// 
// import { Editor } from '@kemsu/editor';
// import { dispdate } from '@lib/dispdate';
// 
// import defaultImage from './course_default_img.jpg';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Progress from '../Progress';
// import CourseUsers from '../CourseUsers';
// import { UserInfo } from '@lib/UserInfo';
// import { dispstr } from '@lib/dispstr';

// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import AccountCircle from '@material-ui/icons/AccountCircle';

export const COURSE_DELIVERY_INSTANCE = ({ id = 'Int!' }) => `
  courseDeliveryInstance(id: ${id}) {
    id
    name
    summary
    description
    picture
    logo
    price
    startDate
    enrollmentEndDate
    isCurrentUserEnrolled
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
        units {
          id
          name
          summary
        }
      }
    }
  }
`;








// function handleTabChange(id, value) {
//   if (value === 0) History.push(`/course-delivery/${id}`);
//   if (value === 1) History.push(`/course-delivery/${id}/content`);
//   if (value === 2) History.push(`/course-delivery/${id}/progress`);
// }






function CourseView({ id, showType, userId }) {
  
  const [{ courseDeliveryInstance: course }, loading, errors] = useQuery(COURSE_DELIVERY_INSTANCE, { id });
  
  // const tabValue = showType === 'content' ? 1 : (showType === 'progress' ? 2 : 0);
  // const isAwaitPurchaseComplition = courseDeliveryInstance?.isAwaitPurchaseComplition;

  const classes = useStyles();
  return <div className={classes.root}>
    <Loader loading={loading} errors={errors}>
      {course != null && <>
        <Header course={course} />
        <Description course={course} />
      </>}
    </Loader>
  </div>;
}

export default React.memo(CourseView);

// {courseDeliveryInstance && <div>

        

//   <div className={classes.content}>

//     <div className={classes.contentContent}>
//       <Tabs variant="fullWidth" className={classes.tabs} indicatorColor="primary" textColor="primary" value={tabValue} onChange={(event, value) => handleTabChange(id, value)}>
//         <Tab className={classes.tab} label="Описание" />
//         <Tab className={classes.tab} label="Содержание" />
//         {(courseDeliveryInstance.enrolled || (UserInfo.role === 'admin' || UserInfo.role === 'superuser' || UserInfo.role === 'instructor')) && <Tab className={classes.tab} label="Достижения" />}
//       </Tabs>

//       <div className={classes.contentContentContent}>
//         {tabValue === 0 && <div>
//           {/**desc */}
//         </div>}
        
//         {tabValue === 1 && <div>
//           {/**content */}
//         </div>}

//         {tabValue === 2 && <div>
//           {UserInfo.role === 'student' ? <Progress id={id} userId={userId} /> : <CourseUsers id={id} />}
//         </div>}
//       </div>
//     </div>

    

//   </div>
  
// </div>}