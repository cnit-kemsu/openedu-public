import { makeStyles } from "@material-ui/core/styles";

export const CourseForm = makeStyles({
  root: {
    width: '800px'
  },
  name: {
    width: '100%'
  },
  gradeTypeSelect: {
    width: '300px'
  },
  laborInput_creditUnit: {
    marginTop: '12px',
    width: '600px'
  },
  laborInput_hours: {
    marginTop: '12px',
    width: '600px'
  },
  outcomes: {
    marginTop: '12px',
    width: '100%'
  },
  competencies: {
    marginTop: '12px',
    width: '100%'
  },
  summary: {
    marginTop: '12px',
    width: '100%'
  },
  description: {
    paddingTop: '6px'
  },
  picture: {
    paddingTop: '6px',
    width: '300px',
    paddingBottom: '12px'
  }
});

export const CourseItem = makeStyles({
  text: {
    //whiteSpace: 'pre-line'
  }
});