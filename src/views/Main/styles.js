import { makeStyles } from "@material-ui/core/styles";

export const CourseItem = makeStyles({
  root: {
    width: '320px',
    heigth: '400px !important'
  }
});

export const Courses = makeStyles({
  root: {
    maxWidth: '1100px',
    margin: 'auto',
    paddingTop: '48px'
  }
});

export const Course = makeStyles({
  root: {
    maxWidth: '1100px',
    margin: 'auto',
    marginTop: '48px',
    padding: '32px 24px'
  }
});

export const Section = makeStyles({
  root: {
    padding: '16px 24px'
  }
});

export const Subsection = makeStyles({
  root: {
    padding: '0px 24px'
  }
});

export const SubsectionView = makeStyles({
  root: {
    maxWidth: '1100px',
    margin: 'auto',
    marginTop: '48px',
    padding: '32px 24px'
  },
  tabs: {
    width: '100%'
  },
  tab: {
    width: '100%'
  },
  content: {
    padding: '50px'
  }
});