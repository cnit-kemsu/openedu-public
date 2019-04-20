import React from 'react';
import { Router } from '@kemsu/router';

import SignInView from './SignIn';
import RegisterView from './Register';
import VerifyView from './Verify';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function handleTabChange(event, value) {
  if (value === 0) Router.push('/signin');
  if (value === 1) Router.push('/register');
}

const tabs = {
  'signin': [0, <SignInView />],
  'register': [1, <RegisterView />],
  'verify': [-1, <VerifyView />]
};

function Authorize({ variant }) {
  const [tabValue, tabView] = tabs[variant];

  return (
    <Paper square style={{ padding: '25px', minWidth: '500px', display: 'inline-block' }}>

      {tabValue >= 0 &&
        <Tabs value={tabValue} onChange={handleTabChange}
          indicatorColor="primary" textColor="primary" style={{ marginBottom: '50px', width: '450px', display: 'inline-block' }}
        >
          <Tab label="Вход" style={{ width: '50%' }} />
          <Tab label="Регистрация" style={{ width: '50%' }} />
        </Tabs>
      }

      <div>
        {tabView}
      </div>

    </Paper>
  );
}

export default React.memo(Authorize);