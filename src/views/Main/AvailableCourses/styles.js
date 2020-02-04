import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export const CourseList = makeStyles({
  root: {
    maxWidth: '1100px',
    margin: 'auto',
    paddingTop: '48px'
  },
  items: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 350px)',
    gridAutoRows: '450px',
    padding: '50px',
    gridGap: '32px'
  },
  emptyMsg: {
    textAlign: 'center'
  }
});

export const CourseItem = makeStyles({
  root: {
    width: '320px'
  },
  content: {
    height: '200px',
    overflow: 'hidden'
  },
  picture: {
    height: '200px'
  },
  actions: {
    justifyContent: 'space-between'
  },
  enrolledMark: {
    marginLeft: '8px',
    color: green[600] + ' !important'
  }
});

export const Search = makeStyles({
  root: {
    width: 'fit-content',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '24px'
  },
  input: {
    width: '400px',
    marginRight: '6px'
  },
  button: {
    marginTop: '3px'
  }
});