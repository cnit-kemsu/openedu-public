import { makeStyles } from "@material-ui/core/styles";

export const AuthInfo = makeStyles(theme => ({
  emailTitle: {
    marginRight: '16px'
  }
}));

export const AppBar = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200] + ' !important',
  },
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
    padding: '64px'
  },
  paper: {
    padding: '32px'
  }
});