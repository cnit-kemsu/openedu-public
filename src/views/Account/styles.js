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
  lastname: {
    marginTop: '48px',
    width: '100%'
  },
  firstname: {
    width: '100%'
  },
  middlename: {
    width: '100%'
  }
});

export const Verify = makeStyles({
  passkey: {
    width: '100%'
  }
});

export const Confirm = makeStyles({
  passkey: {
    width: '100%'
  },
  password: {
    width: '100%'
  },
  confirmPassword: {
    width: '100%'
  },
});

export const Complete = makeStyles({
  firstname: {
    width: '100%'
  },
  lastname: {
    width: '100%'
  },
  middlename: {
    width: '100%'
  }
});

export const UserProfileData = makeStyles({
  editButton: {
    float: 'right'
  },
  editIcon: {
    marginRight: '6px'
  },
  icon: {
    fontSize: '96px'
  },
  picture: {
    height: '96px',
    width: '96px',
    //margin: 'auto'
  }
});

export const EditUserProfileForm = makeStyles({
  firstname: {
    width: '100%'
  },
  lastname: {
    width: '100%'
  },
  middlename: {
    width: '100%'
  },
  picture: {
    paddingTop: '6px',
    width: '200px',
    paddingBottom: '12px'
  }
});

export const EditUserProfile = makeStyles({
  topBar: {
    display: 'flex',
    alignItems: 'center'
  }
});
