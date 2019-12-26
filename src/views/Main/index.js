import React from 'react';
import Search from './AvailableCourses/Search';
import AvailableCourses from './AvailableCourses';
import { Main as useStyles } from './styles';
import greetingImg from './greeting_img.png';

function Main() {
  
  const classes = useStyles();
  return <div>

    <div className={classes.greetingContainer}>
      <img src={greetingImg} className={classes.greetingImg} />
    </div>

    <Search />

    <AvailableCourses />

  </div>;
}

export default React.memo(Main);