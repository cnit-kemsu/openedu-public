import React from 'react';
import { Location, useRoute } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, Loader } from '@kemsu/core';
import CourseItem from './CourseItem';
import { CourseList as useStyles } from './styles';

export const AVAILABLE_COURSES = ({ searchName = 'String' }) => `
  availableCourseDeliveryInstances: allCourseDeliveryInstances(
    defunct: false
    availableToEnroll: true
    searchName: ${searchName}
  ) {
    id
    name
    summary
    picture
    startDate
    enrollmentEndDate
  }
`;

function CourseList() {
  
  useRoute();
  const { 'search-name': searchName } = Location.search;
  const [{ availableCourseDeliveryInstances: courses }, loading, errors] = useQuery(AVAILABLE_COURSES, { searchName });
  const courseItems = useElementArray(CourseItem, courses, {});

  const classes = useStyles();
  return <div className={classes.root}>

    <Loader loading={loading} errors={errors}>{

      courses?.length > 0
      ? <div className={classes.items}>{courseItems}</div>
      : <div className={classes.emptyMsg}>{
        searchName ?
        `По вашему запросу ничего не найдено`
        : (!loading && `Пока не создан не один курс`)
      }</div>

    }</Loader>

  </div>;
}

export default React.memo(CourseList);