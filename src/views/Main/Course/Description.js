import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { Editor } from '@kemsu/editor';
import { Description as useStyles } from './styles';

function Description({ course: { description, instructors } }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <div className={classes.inner}>

      <div className={classes.main}>

        <Editor editorState={description} readOnly={true} />

        {instructors.length > 0 && <>
          <Typography variant="h5">Ваши преподаватели</Typography>
          {/* <Instructors instructors={instructors} /> */}
        </>}

      </div>

      <div className={classes.info}>
        
      </div>

    </div>
  </div>;
}

export default memo(Description);
              

{/* <div className={classes.info}>
<Typography className={classes.infoHeader}>Информация о курсе</Typography>
{startDate !== null && <div className={classes.infoNode}>
  <Typography className={classes.dateName}>Начало обучения:</Typography>
  <Typography className={classes.dateValue}>{dispdate(startDate)}</Typography>
</div>}
{enrollmentEndDate !== null && <div className={classes.infoNode}>
  <Typography className={classes.dateName}>Окончание регистрации:</Typography>
  <Typography className={classes.dateValue}>{dispdate(enrollmentEndDate)}</Typography>
</div>}
</div> */}