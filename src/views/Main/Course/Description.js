import React, { memo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { History, useRoutes } from '@kemsu/router';
import { Editor } from '@kemsu/editor';
import { dispdate } from '@lib/dispdate';
import Content from './Content';
import Progress from './Progress';
import Instructors from './Instructors';
import { Description as useStyles, InfoItem as useInfoItemStyles } from './styles';
import { UserInfo } from '@lib/UserInfo';

function InfoItem({ icon, name, value }) {

  const classes = useInfoItemStyles();
  return <tr className={classes.root}>
    <td className={classes.icon}>{icon}</td>
    <td className={classes.name}><Typography component="span">{name}</Typography></td>
    <td><Typography component="span">{value}</Typography></td>
  </tr>;
}
InfoItem = memo(InfoItem);

const routes = [
  [/.+\/about$/, () => ([({ description }) => <Editor editorState={description} readOnly={true} />, 0])],
  [/.+\/content$/, () => ([({ sections, isCurrentUserEnrolled }) => <Content {...{ sections, isCurrentUserEnrolled }} />, 1])],
  [/.+\/progress$/, () => ([({ isCurrentUserEnrolled, id }) => <Progress {...{ isCurrentUserEnrolled, id }} />, 2])]
];

function handleTabChange(value, id) {
  if (value === 0) History.push(`/course-delivery/${id}/about`);
  if (value === 1) History.push(`/course-delivery/${id}/content`);
  if (value === 2) History.push(`/course-delivery/${id}/progress`);
}

function Description({ course: { id, description, instructors, startDate, logo, enrollmentEndDate, sections, isCurrentUserEnrolled } }) {

  const [renderView, tabValue] = useRoutes(routes, {}) || [];

  const classes = useStyles();
  return <div className={classes.root}>
    <div className={classes.inner}>

      <div className={classes.main}>

        {tabValue !== undefined &&
          <Tabs value={tabValue} onChange={(event, value) => handleTabChange(value, id)}
            indicatorColor="primary" textColor="primary" className={classes.tabs}
          >
            <Tab label="О курсе" className={classes.tab} />
            <Tab label="Содержание" className={classes.tab} />
            {(isCurrentUserEnrolled ||UserInfo.role !== 'student') && <Tab label="Достижения" className={classes.tab} />}
          </Tabs>
        }

        <div className="section">
          {renderView != null && renderView({ description, sections, isCurrentUserEnrolled, id })}
        </div>

      </div>

      <div className={classes.info}>

        <table>
          <tbody>
            {startDate && <InfoItem icon={<CalendarIcon />} name="Начало обучения" value={dispdate(startDate)} />}
            {enrollmentEndDate && <InfoItem icon={<CalendarIcon />} name="Окончание регистрации" value={dispdate(enrollmentEndDate)} />}
          </tbody>
        </table>

        {logo && <div className={classes.logoContainer}>
          <img className={classes.logo} src={'/files/' + logo.fileSourceKey} />
        </div>}

        {instructors.length > 0 && <>
          <div className={classes.instructors  + ' section'}>
            <Typography variant="h5">Ваши преподаватели</Typography>
            <Instructors instructors={instructors} />
          </div>
        </>}

      </div>

    </div>
  </div>;
}

export default memo(Description);