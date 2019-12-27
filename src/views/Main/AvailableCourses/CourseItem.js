import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { History } from '@kemsu/router';
import { CourseItem as useStyles } from './styles';
import defaultCourseImage from '../course_default_img.jpg';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function routeToCourseView(id) {
  History.push(`/course-delivery/${id}`);
}

export default function CourseItem({ id, picture, name, summary, isCurrentUserEnrolled }) {
  
  if (id === 1) isCurrentUserEnrolled = true;
  const classes = useStyles();
  return <Card className={classes.root}>

    <CardMedia className={classes.picture} component="img" src={picture ? ('/files/' + picture.fileSourceKey) : defaultCourseImage} />

    <CardContent className={classes.content}>
      <Typography variant="h6">{name}</Typography>
      <Typography color="textSecondary">{summary}</Typography>
    </CardContent>

    <CardActions className={classes.actions}>

      <div>
        {isCurrentUserEnrolled && <Tooltip title="Вы записаны на этот курс">
          <CheckCircleIcon className={classes.enrolledMark} />  
        </Tooltip>}
      </div>

      <Button size="small" color="primary" onClick={() => routeToCourseView(id)}>
        Подробнее
      </Button>
      
    </CardActions>

  </Card>;
}