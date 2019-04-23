import { makeStyles } from "@material-ui/core/styles";

export const AuthInfo = makeStyles({
  emailTitle: {
    marginRight: '15px'
  }
});

export const AppBar = makeStyles(theme => ({
  // root: {
  //   flexGrow: 1,
  // },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  }
}));

export const PageNotFound = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    minHeight: '25%',
    margin: 'auto',
    padding: '50px'
  },
  paper: {
    padding: '50px'
  }
});