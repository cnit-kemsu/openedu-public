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
    isCurrentUserEnrolled
  }
`;

function AvailableCourseList() {
  
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

AvailableCourseList = React.memo(AvailableCourseList);

export const MY_COURSES = ({ searchName = 'String' }) => `
  availableCourseDeliveryInstances: allCourseDeliveryInstances(
    defunct: false
    searchName: ${searchName}
    currentUserEnrolled: true
  ) {
    id
    name
    summary
    picture
    startDate
    enrollmentEndDate
    isCurrentUserEnrolled
  }
`;

function MyCourseList() {
  
  useRoute();
  const { 'search-name': searchName } = Location.search;
  const [{ availableCourseDeliveryInstances: courses }, loading, errors] = useQuery(MY_COURSES, { searchName });
  const courseItems = useElementArray(CourseItem, courses, {});

  const classes = useStyles();
  return <div className={classes.root}>

    <Loader loading={loading} errors={errors}>{

      courses?.length > 0
      ? <div className={classes.items}>{courseItems}</div>
      : <div className={classes.emptyMsg}>{
        searchName ?
        `По вашему запросу ничего не найдено`
        : (!loading && `Вы пока не записаны ни на один курс`)
      }</div>

    }</Loader>

  </div>;
}

MyCourseList = React.memo(MyCourseList);

export {
  AvailableCourseList,
  MyCourseList
};