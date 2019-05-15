import { makeStyles } from "@material-ui/core/styles";

export const UserForm = makeStyles({
  root: {
    width: '400px'
  },
  email: {
    width: '100%'
  },
  role: {
    width: '100%'
  }
});

export const UserStatus = makeStyles({
  root: {
    width: 'min-content',
    marginLeft: '24px'
  }
});

export const StatusChip = makeStyles(theme => ({
  root: {
    fontSize: '12px',
    height: 'auto',
    margin: 'auto'
  },
  label: {
    padding: '0px 8px',
    color: theme.palette.common.white
  },
  icon: {
    fontSize: '14px',
    marginRight: '-4px',
    color: theme.palette.common.white
  }
}));