import { makeStyles } from "@material-ui/core/styles";

export const NavItem = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '14 !important'
      //backgroundColor: '#a06e9114 !important'
    }
  },
  selected: {
    backgroundColor: theme.palette.primary.light + '59 !important'
    //backgroundColor: '#a06e9159 !important'
  },
  touchRipple: {
    color: theme.palette.primary.light
    //color: '#a06e91'
  }
}));

const drawerWidth = '300px';

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
    fontSize: '36px',
    marginRight: '8px'
  },
  title: {
    backgroundColor: theme.palette.primary.dark,
    //backgroundColor: '#8f6e91',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '63px'
  },
  titleFragment: {
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  accountInfo: {
    backgroundColor: theme.palette.primary.main,
    //backgroundColor: '#786e91',
    textAlign: 'center',
    padding: '16px 8px 16px 8px'
  },
  userIcon: {
    fontSize: '96px'
  },
  userEmail: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuButton: {
    color: 'inherit',
    marginLeft: '8px'
  },
  divider: {
    backgroundColor: theme.palette.common.white + ' !important',
  }
}));