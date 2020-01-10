import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { Editor } from '@kemsu/editor';
import { dispdate } from '@lib/dispdate';
import MoreText from '@components/MoreText';
import Content from './Content';
import Instructors from './Instructors';
import { Description as useStyles, InfoItem as useInfoItemStyles } from './styles';

function InfoItem({ icon, name, value }) {

  const classes = useInfoItemStyles();
  return <tr className={classes.root}>
    <td className={classes.icon}>{icon}</td>
    <td className={classes.name}><Typography component="span">{name}</Typography></td>
    <td><Typography component="span">{value}</Typography></td>
  </tr>;
}
InfoItem = memo(InfoItem);

function Description({ course: { description, instructors, startDate, enrollmentEndDate, sections, isCurrentUserEnrolled } }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <div className={classes.inner}>

      <div className={classes.main}>

        <div className={classes.text + ' section'}>
          <Typography variant="h5">О курсе</Typography>
          <Editor editorState={description} readOnly={true} />
        </div>

        <div className="section">
          <MoreText title="Содержание" content={<Content {...{ sections, isCurrentUserEnrolled }} />} />
        </div>

        {instructors.length > 0 && <>
          <div className={classes.instructors  + ' section'}>
            <Typography variant="h5">Ваши преподаватели</Typography>
            <Instructors instructors={instructors} />
          </div>
        </>}

      </div>

      <div className={classes.info}>
        <table>
          <tbody>
            {startDate && <InfoItem icon={<CalendarIcon />} name="Начало обучения" value={dispdate(startDate)} />}
            {enrollmentEndDate && <InfoItem icon={<CalendarIcon />} name="Окончание регистрации" value={dispdate(enrollmentEndDate)} />}
          </tbody>
        </table>
      </div>

    </div>
  </div>;
}

export default memo(Description);