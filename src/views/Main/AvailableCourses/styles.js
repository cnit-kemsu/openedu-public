import { makeStyles } from '@material-ui/core/styles';

export const CourseList = makeStyles({
  root: {
    maxWidth: '1100px',
    margin: 'auto',
    paddingTop: '48px'
  },
  items: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 400px)',
    gridAutoRows: '450px',
    padding: '50px'
  },
  emptyMsg: {
    textAlign: 'center'
  }
});

export const CourseItem = makeStyles({
  root: {
    width: '320px',
    height: '400px !important'
  },
  summary: {
    height: '100px',
    overflow: 'hidden'
  },
  picture: {
    height: '180px'
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