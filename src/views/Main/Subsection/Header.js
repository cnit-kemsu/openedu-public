import React, { memo, useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Location, History, useRoute } from '@kemsu/router';
import { Link } from '@kemsu/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Header as useStyles } from './styles';


function SubsectionHeader({ subsection: { id, name: subsectionName, units, previousSubsectionId, nextSubsectionId, section: { name: sectionName, course: { name: courseName, id: courseId } } } }) {
  //const [tabValue, setTabValue] = useState(0);
  useRoute();
  const unitIndex = Location.search['unit-index']
  |> # && (# === -1 && units.length - 1) || 0;
  const unit = units[unitIndex];

  const isFirstUnitInSubsection = unitIndex === 0;
  const isLastUnitInSubsection = unitIndex === units.length - 1;
  const navigateToPreviousUnit = useCallback(() => {
    if (isFirstUnitInSubsection) History.push(`/delivery-subsection/${previousSubsectionId}`, { 'unit-index': -1 });
    else History.push(`/delivery-subsection/${id}`, { 'unit-index': unitIndex - 1 });
  }, [isFirstUnitInSubsection, previousSubsectionId]);
  const navigateToNextUnit = useCallback(() => {
    if (isLastUnitInSubsection) History.push(`/delivery-subsection/${nextSubsectionId}`);
    else History.push(`/delivery-subsection/${id}`, { 'unit-index': unitIndex + 1 });
  }, [isLastUnitInSubsection, nextSubsectionId]);

  const classes = useStyles();
  return <div className={classes.root}>

    <div className={classes.inner}>

      <Tooltip title="Назад к содержанию">
        <span>
          <Link path={`/course-delivery/${courseId}`} styled variant="h4">{courseName}</Link>
        </span>
      </Tooltip>

      {sectionName !== '0' && <Typography variant="h5">{sectionName}</Typography>}
      {subsectionName !== '0' && <Typography variant="h6">{subsectionName}</Typography>}

      <div>

        <Button disabled={isFirstUnitInSubsection && previousSubsectionId == null} onClick={navigateToPreviousUnit}><NavigateBeforeIcon /></Button>

        <Tabs value={unitIndex}
          onChange={(event, value) => History.push(`/delivery-subsection/${id}`, { 'unit-index': value })}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          TabIndicatorProps={{ className: classes.tabIndicator }}
        >
          {units.map(({ name }, index) => (
            <Tab className={classes.tab} key={index} label={name} />
          ))}
        </Tabs>

        <Button disabled={isLastUnitInSubsection && nextSubsectionId == null} onClick={navigateToNextUnit}><NavigateNextIcon /></Button>

      </div>

    </div>

  </div>;
}

export default memo(SubsectionHeader);