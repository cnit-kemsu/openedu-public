import React from 'react';
import Search from './AvailableCourses/Search';
import { AvailableCourseList, MyCourseList } from './AvailableCourses';
import { Main as useStyles } from './styles';
import greetingImg from './greeting_img.png';
import { Typography } from '@material-ui/core';

function Main({ showOnlyEnrolled }) {
  
  const classes = useStyles();
  return <div>

    {showOnlyEnrolled && <div style={{ textAlign: 'center', padding: '48px 0px 24px 0px' }}>
      <Typography variant="h4">Мои курсы</Typography>  
    </div>}

    {!showOnlyEnrolled && <div className={classes.greetingContainer}>
      <img src={greetingImg} className={classes.greetingImg} />
    </div>}

    <Search />

    {showOnlyEnrolled ? <MyCourseList /> : <AvailableCourseList />}

  </div>;
}

export default React.memo(Main);