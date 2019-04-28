import { makeStyles } from "@material-ui/core/styles";

export const AppBar = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200] + ' !important',
    color: 'inherit'
  },
}));

export const Routing = makeStyles({
  root: {
    padding: '32px 64px 64px 64px'
  },
  paper: {
    padding: '32px'
  },
  breadcrumbs: {
    marginBottom: '32px'
  }
});

export default makeStyles({
  content: {
    width: '100%'
  }
});