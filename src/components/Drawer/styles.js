import { makeStyles } from "@material-ui/core/styles";

export const NavItem = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '14 !important'
    }
  },
  selected: {
    backgroundColor: theme.palette.primary.light + '59 !important'
  },
  touchRipple: {
    color: theme.palette.primary.light
  }
}));

export const AccountInfo = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    padding: '16px 8px 16px 8px'
  },
  icon: {
    fontSize: '96px'
  },
  _: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuButton: {
    color: 'inherit',
    marginLeft: '8px'
  }
}));

export const drawerWidth = '300px';

export default makeStyles(theme => ({
  root: {
    width: drawerWidth
  },
  paper: {
    width: drawerWidth,
    backgroundColor: '#222222 !important',
    color: theme.palette.common.white,
    border: 'none !important'
  }, 
  logo: {
    backgroundColor: theme.palette.primary.dark,
    height: '64px'
  },
  divider: {
    backgroundColor: theme.palette.common.white + ' !important',
  }
}));