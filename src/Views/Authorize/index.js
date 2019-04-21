import React from 'react';
import { Router } from '@kemsu/router';
import SignInView from './SignIn';
import RegisterView from './Register';
import VerifyView from './Verify';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './styles';

function handleTabChange(event, value) {
  if (value === 0) Router.push('/signin');
  if (value === 1) Router.push('/register');
}

const tabs = {
  'signin': [0, <SignInView />, '500px'],
  'register': [1, <RegisterView />, '600px'],
  'verify': [-1, <VerifyView />, '500px']
};

function Authorize({ variant }) {
  const [tabValue, tabView, width] = tabs[variant];
  
  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper} style={{ width }}>

      {tabValue >= 0 &&
        <Tabs value={tabValue} onChange={handleTabChange}
          indicatorColor="primary" textColor="primary" className={classes.tabs}
        >
          <Tab label="Вход" className={classes.tab} />
          <Tab label="Регистрация" className={classes.tab} />
        </Tabs>
      }

      <div>
        {tabView}
      </div>

    </Paper>
  </div>;
}

export default React.memo(Authorize);