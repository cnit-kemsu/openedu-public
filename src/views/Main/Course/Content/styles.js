import { makeStyles } from '@material-ui/core/styles';

export const ExpansionItem = makeStyles(theme => ({
  root: {
    marginTop: '12px',
    borderLeft: `6px solid ${theme.palette.primary.light}`,
    paddingLeft: '12px'
  }
}));