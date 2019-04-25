import { makeStyles } from "@material-ui/core/styles";

//#a06e91

export const AuthInfo = makeStyles(theme => ({
  emailTitle: {
    marginRight: '15px'
  },
  drawer_account: {
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px'
  },
  drawer_userIcon: {
    fontSize: '96px'
  },
  drawer_userEmail: {
  }
}));

export const AppBar = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200] + '!important',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  }
}));

export const PageNotFound = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    minHeight: '25%',
    margin: 'auto',
    padding: '50px'
  },
  paper: {
    padding: '50px'
  }
});

const drawerWidth = '300px';

export const Drawer = makeStyles(theme => ({
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
    marginRight: '15px'
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    //backgroundColor: '#8f6e91',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '63px'
  },
  titleFragment: {
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  accountInfo: {
    backgroundColor: theme.palette.primary.light,
    //backgroundColor: '#786e91',
    textAlign: 'center',
    padding: '20px 10px 20px 10px'
  },
  userIcon: {
    fontSize: '96px'
  },
  divider: {
    backgroundColor: theme.palette.common.white + '!important',
  }
}));