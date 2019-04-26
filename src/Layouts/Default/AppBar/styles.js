import { makeStyles } from "@material-ui/core/styles";

export const AccountInfo = makeStyles({
  userEmail: {
    marginRight: '16px'
  }
});

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200] + ' !important',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  }
}));