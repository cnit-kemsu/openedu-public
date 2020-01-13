import { makeStyles } from '@material-ui/core/styles';

export const Header = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderBottom: '1px solid rgba(0, 0, 0, 0.28)',
    boxShadow: '0px 4px 8px -2px rgba(0,0,0,0.2), 0px 8px 10px 0px rgba(0,0,0,0.14), 0px 2px 20px 0px rgba(0,0,0,0.12)',
  },
  inner: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '64px 0px 0px 0px',
    display: 'block',
    '& > *:not(:first-child)': {
      paddingTop: '20px'
    }
  },
  subsectionDiv: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subsectionTitle: {
    maxWidth: '650px'
  },
  tab: {
    textTransform: 'none'
  }
}));
