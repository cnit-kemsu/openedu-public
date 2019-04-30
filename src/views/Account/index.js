import React from 'react';
import { History, useRoutes } from '@kemsu/router';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './styles';
import SignIntoAccountView from './SignIn';
import SignUpAccountView from './SignUp';
import VerifyAccountView from './Verify';

function handleTabChange(event, value) {
  if (value === 0) History.push('/account/signin');
  if (value === 1) History.push('/account/signup');
}

const tabs = {
  'signin': [0, <SignIntoAccountView />],
  'signup': [1, <SignUpAccountView />],
  'verify': [-1, <VerifyAccountView />]
};

function AccountView({ variant }) {
  const [tabValue, tabView] = tabs[variant];
  
  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>

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

export default React.memo(AccountView);