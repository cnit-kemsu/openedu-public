import { makeStyles } from "@material-ui/core/styles";

export const CourseReleaseForm = makeStyles({
  root: {
    width: '800px'
  },
  name: {
    width: '100%'
  },
  summary: {
    width: '100%',
    marginBottom: '16px'
  },
  startDate: {
    width: '70%'
  },
  enrollmentEndDate: {
    width: '70%',
    marginTop: '16px'
  }
});