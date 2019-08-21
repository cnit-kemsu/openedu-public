import { makeStyles } from "@material-ui/core/styles";

export const CourseForm = makeStyles({
  root: {
    width: '800px'
  },
  name: {
    width: '100%'
  },
  summary: {
    marginTop: '12px',
    width: '100%'
  },
  description: {
    paddingTop: '6px'
  }
});

export const CourseItem = makeStyles({
  text: {
    //whiteSpace: 'pre-line'
  }
});