import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    minHeight: '50%',
    margin: 'auto',
    padding: '50px'
  },
  paper: {
    padding: '50px',
    width: '500px'
  },
  tabs: {
    width: '450px',
    margin: 'auto',
    marginBottom: '25px'
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
    marginTop: '50px'
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