import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { History } from '@kemsu/router';
import { useQuery } from '@kemsu/graphql-client';
import { useElementArray, Loader } from '@kemsu/core';
import { CourseItem as useCourseItemStyles, Courses as useStyles } from './styles';
import defaultImage from './default_img.jpg';

export const COURSES = () => `
  courseReleases(limit: 100) {
    id
    name
    summary
    startDate
    enrollmentEndDate
  }
`;

function routeToCourseView(id) { History.push(`/course/${id}`); }

function CourseItem({ id, name, summary }) {

  const classes = useCourseItemStyles();
  return <Card className={classes.root}>
      <CardMedia component="img" src={defaultImage} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
        <Typography className={classes.summary} color="textSecondary">
          {summary}
        </Typography>
      </CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={() => routeToCourseView(id)}>
        Далее
      </Button>
    </CardActions>
  </Card>;
}

function Courses() {
  
  const [{ courseReleases: courses }, loading, errors] = useQuery(COURSES);
  const courseItems = useElementArray(CourseItem, courses, {});

  const classes = useStyles();
  return <div className={classes.root}>
    <Loader loading={loading} errors={errors}>
      <div className={classes.courses}>
        {courses && courseItems}
      </div>
    </Loader>
  </div>;
}

export default React.memo(Courses);