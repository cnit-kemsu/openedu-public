import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { History } from '@kemsu/router';
import { CourseItem as useStyles } from './styles';
import defaultCourseImage from '../course_default_img.jpg';

function routeToCourseView(id) {
  History.push(`/course-delivery/${id}`);
}

export default function CourseItem({ id, name, summary, picture }) {
  
  const classes = useStyles();
  return <Card className={classes.root}>

    <CardMedia className={classes.picture} component="img" src={picture ? ('/files/' + picture.fileSourceKey) : defaultCourseImage} />

    <CardContent style={{ height: '170px', overflow: 'hidden' }}>
      <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
      <Typography className={classes.summary} color="textSecondary">
        {summary}
      </Typography>
    </CardContent>

    <CardActions>
      <Button size="small" color="primary" onClick={() => routeToCourseView(id)}>
        Подробнее
      </Button>
    </CardActions>

  </Card>;
}