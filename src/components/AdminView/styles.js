import { makeStyles } from "@material-ui/core/styles";

export const AppBar = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200] + ' !important',
    color: 'inherit'
  }
}));

export const Breadcrumbs = makeStyles({
  root: {
    padding: '32px 48px'
  }
});

export const Paper = makeStyles({
  root: {
    width: 'fit-content',
    margin: '0px 48px',
    padding: '32px 24px'
  }
});