import { makeStyles } from '@material-ui/core/styles';

export const Unit = makeStyles(theme => ({
  root: {
    marginTop: '12px',
    borderLeft: `6px solid ${theme.palette.primary.light}`,
    paddingLeft: '12px',
    marginBottom: '8px'
  }
}));

export default makeStyles(theme => ({
  root: {
    padding: '32px',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.light}`,
  }
}));