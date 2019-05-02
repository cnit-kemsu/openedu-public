import { makeStyles } from "@material-ui/core/styles";

export const AccountInfo = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary
  },
  menuButton: {
    marginLeft: '8px'
  },
  icon: {
    color: theme.palette.text.secondary,
    fontSize: '44px',
    marginRight: '8px'
  }
}));

export const AccountStatus = makeStyles(theme => ({
  registerButton: {
    color: theme.palette.text.secondary,
    marginRight: '8px'
  }
}));

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
  logo: {
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    height: '64px'
  },
  logo_logo: {
    backgroundColor: theme.palette.primary.dark,
    padding: '12px'
  },
  logo_title: {
    whiteSpace: 'nowrap',
    paddingRight: '12px'
  }
}));