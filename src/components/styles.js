import { makeStyles } from "@material-ui/core/styles";

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

export const Logo = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: 'bold',
    marginRight: '12px',
    color: 'inherit'
  },
  title: {
    color: 'inherit'
  }
});

export const RouteBackBtn = makeStyles({
  root: {
    marginRight: '8px !important'
  }
});