import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    minHeight: '50%',
    margin: 'auto',
    padding: '48px'
  },
  paper: {
    padding: '48px',
    width: '600px'
  },
  tabs: {
    width: '450px',
    margin: 'auto',
    marginBottom: '24px'
  },
  tab: {
    width: '50%'
  }
});

export const SignIn = makeStyles({
  email: {
    width: '100%'
  },
  password: {
    width: '100%'
  }
});

export const SignUp = makeStyles({
  email: {
    width: '100%'
  },
  password: {
    width: '100%'
  },
  confirmPassword: {
    width: '100%'
  },
  firstname: {
    width: '100%',
    marginTop: '48px'
  },
  lastname: {
    width: '100%'
  }
});

export const Verify = makeStyles({
  code: {
    width: '100%'
  }
});