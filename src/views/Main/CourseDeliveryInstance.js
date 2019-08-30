import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { History } from '@kemsu/router';
import { useQuery, useMutation, refetch } from '@kemsu/graphql-client';
import { Loader, Link, Notifications } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { dispdate } from '@lib/dispdate';
import { CourseDeliveryInstance as useStyles, Section as useSectionStyles, Subsection as useSubsectionStyles } from './styles';
import defaultImage from './default_img.jpg';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

  const nowDate = new Date();
  let access = accessDate ? nowDate > new Date(accessDate) : true;
  access = expirationDate ? nowDate < new Date(expirationDate) : access;

  const classes = useSubsectionStyles();
  return <div className={classes.root}>
    <ExpansionPanel disabled={!summary} classes={{ disabled: classes.disabled }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ disabled: classes.sumDisabled }}>
        <div>
          {enrolled
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
}

function CourseDeliveryInstance({ id, content }) {
  
  const [{ courseDeliveryInstance }, loading, errors] = useQuery(COURSE_DELIVERY_INSTANCE, { id });
  const enrollToCourseDeliveryInstance = useMutation(ENROLL_TO_COURSE_DELIVERY_INSTANCE, { onComplete }, { id });
  const tabValue = content ? 1 : 0;

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
              : <Button className={classes.enrollButton} color="primary" variant="contained" onClick={() => enrollToCourseDeliveryInstance()}>Записаться на курс</Button>
            }
          </div>
          {<img className={classes.headerPic} src={courseDeliveryInstance.picture ? ('/files/' + courseDeliveryInstance.picture.fileSourceKey) : defaultImage} /> }
        </div>

        <div className={classes.content}>

          <div className={classes.contentContent}>
            <Tabs variant="fullWidth" className={classes.tabs} indicatorColor="primary" textColor="primary" value={tabValue} onChange={(event, value) => handleTabChange(id, value)}>
              <Tab className={classes.tab} label="Описание" />
              <Tab className={classes.tab} label="Содержание" />
            </Tabs>

            <div className={classes.contentContentContent}>
              {tabValue === 0 && <div>
                {courseDeliveryInstance.description && <Editor editorState={courseDeliveryInstance.description} readOnly={true} />}
              </div>}
              
              {tabValue === 1 && <div>
                {courseDeliveryInstance.sections.map((props, index) => renderSection(props, index + 1, courseDeliveryInstance.enrolled))}
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