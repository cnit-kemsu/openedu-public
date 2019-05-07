import { makeStyles } from "@material-ui/core/styles";

export const AppBar = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200] + ' !important',
    color: 'inherit'
  },
  toolbar: {
    justifyContent: 'space-between',
    maxWidth: '1000px',
    margin: 'auto',
    width: 'inherit'
  }
}));

export const Breadcrumbs = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1000px',
    margin: 'auto',
    width: 'inherit'
  },
  breadcrumbs: {
    padding: '32px 48px'
  }
});

export const Paper = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1000px',
    margin: 'auto',
    width: 'inherit'
  },
  paper: {
    minWidth: '400px',
    width: 'fit-content',
    margin: '0px 48px',
    padding: '32px 24px',
  }
});

export const Div = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1000px',
    margin: 'auto',
    width: 'inherit'
  },
  div: {
    marginTop: '16px',
    marginLeft: '48px'
  }
});


export const LeftBar = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flex: '1'
  }
});