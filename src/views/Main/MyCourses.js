import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { History } from '@kemsu/router';
import { TextField } from '@kemsu/inputs';
import { useForm } from '@kemsu/form';
import { useQuery, refetch } from '@kemsu/graphql-client';
import { useElementArray, Loader } from '@kemsu/core';
import { CourseDeliveryInstanceItem as useCourseDeliveryInstanceItemStyles, CourseDeliveryInstances as useStyles } from './styles';
import defaultImage from './default_img.jpg';
import greetingImg from './greeting.png';
import SearchIcon from '@material-ui/icons/Search';

export const AVAILABLE_COURSE_DELIVERY_INSTANCES = ({ nameSearch = 'String' }) => `
  availableCourseDeliveryInstances: allCourseDeliveryInstances(limit: 100 onlyEnrolled: true name: ${nameSearch}) {
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

const imgContainerStyle = {
  height: '350px',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden'
};

const imgStyle = {
  height: '100%'
};

function search({ nameSearch }) {
  refetch([AVAILABLE_COURSE_DELIVERY_INSTANCES, { nameSearch: nameSearch ? '%' + nameSearch + '%' : undefined }]);
}

function CourseDeliveryInstances() {
  
  const form = useForm(search);
  const [{ availableCourseDeliveryInstances }, loading, errors] = useQuery(AVAILABLE_COURSE_DELIVERY_INSTANCES);
  const courseDevlieryInstanceItems = useElementArray(CourseDeliveryInstanceItem, availableCourseDeliveryInstances, {});

  const classes = useStyles();
  return <div>

    <div className={classes.myCourses}>
      <Typography variant="h4">Мои курсы</Typography>
    </div>
    

    <div className={classes.searchRoot}>
      <TextField className={classes.searchInput}
        variant="outlined"
        comp={form}
        name="nameSearch"
        label="Поиск курсов"
      />
      <Button className={classes.searchButton} variant="contained" color="primary" onClick={form.submit}><SearchIcon />Найти</Button>
    </div>

    <div className={classes.root}>
      <Loader loading={loading} errors={errors}>
        
        {availableCourseDeliveryInstances && (
          availableCourseDeliveryInstances?.length > 0
          ? <div className={classes.items}>{courseDevlieryInstanceItems}</div>
          : (form?.values?.nameSearch ? <div style={{ textAlign: 'center' }}>По вашему запросу ничего не найдено</div> : <div style={{ textAlign: 'center' }}>Вы не записаны не на один курс</div>)
        )}
      </Loader>
    </div>
  </div>;
}

export default React.memo(CourseDeliveryInstances);