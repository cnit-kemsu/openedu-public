import { makeStyles } from "@material-ui/core/styles";

export const AccountView = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary
  },
  menuButton: {
    marginLeft: '8px'
  },
  accountIcon: {
    color: theme.palette.text.secondary,
    fontSize: '44px',
    marginRight: '8px'
  }
}));

export const AccountInfo = makeStyles({
  accountIcon: {
    marginRight: '8px'
  }
});

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white + ' !important',
    borderBottom: '1px solid ' + theme.palette.primary.light
  },
  toolbar: {
    justifyContent: 'space-between',
    maxWidth: '1400px',
    margin: 'auto',
    width: 'inherit'
  },
  sitename: {
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    height: '64px'
  },
  title: {
    whiteSpace: 'nowrap',
    padding: '0px 16px'
  },
  logo: {
    backgroundColor: theme.palette.primary.dark,
    fontSize: '64px',
    padding: '8px'
  }
}));