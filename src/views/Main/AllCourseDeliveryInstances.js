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
import { CourseDeliveryInstanceItem as useCourseDeliveryInstanceItemStyles, CourseDeliveryInstances as useStyles } from './styles';
import defaultImage from './default_img.jpg';

export const AVAILABLE_COURSE_DELIVERY_INSTANCES = () => `
  availableCourseDeliveryInstances: allCourseDeliveryInstances(limit: 100 availableToEnroll: true) {
    id
    name
    summary
    picture
    startDate
    enrollmentEndDate
  }
`;

function routeToCourseDeliveryView(id) { History.push(`/course-delivery/${id}`); }

function CourseDeliveryInstanceItem({ id, name, summary, picture }) {

  const classes = useCourseDeliveryInstanceItemStyles();
  return <Card className={classes.root}>
      <CardMedia className={classes.picture} component="img" src={picture ? ('/files/' + picture.fileSourceKey) : defaultImage} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
        <Typography className={classes.summary} color="textSecondary">
          {summary}
        </Typography>
      </CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={() => routeToCourseDeliveryView(id)}>
        Подробнее
      </Button>
    </CardActions>
  </Card>;
}

function CourseDeliveryInstances() {
  
  const [{ availableCourseDeliveryInstances }, loading, errors] = useQuery(AVAILABLE_COURSE_DELIVERY_INSTANCES);
  const courseDevlieryInstanceItems = useElementArray(CourseDeliveryInstanceItem, availableCourseDeliveryInstances, {});

  const classes = useStyles();
  return <div className={classes.root}>
    <Loader loading={loading} errors={errors}>
      <div className={classes.items}>
        {availableCourseDeliveryInstances && courseDevlieryInstanceItems}
      </div>
    </Loader>
  </div>;
}

export default React.memo(CourseDeliveryInstances);