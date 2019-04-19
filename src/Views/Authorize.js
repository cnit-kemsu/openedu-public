import React from 'react';
import { Router, useRouting } from '@kemsu/router';

import SignInView from './Signin';
import RegisterView from './Register';
import VerifyView from './VerificationView';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function handleTabChange(event, value) {
  if (value === 0) Router.push({ pathname: '/signin' });
  if (value === 1) Router.push({ pathname: '/register' });
}

// const routes = {
//   '/signin': [0, <SigninView />],
//   '/register': [1, <RegisterView />],
//   '/verify': [undefined, <VerificationView />]
// };

const tabs = {
  'signin': [0, <SignInView />],
  'register': [1, <RegisterView />],
  'verify': [-1, <VerifyView />]
};



function View({ variant }) {
  //console.log(variant);
  //const [[tabValue, routing] = [0, undefined]] = useRouting(routes);
  const [tabValue, view] = tabs[variant];

  return (
    //<div id="authorize-view" style={{ display: 'inline-block' }}>
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
          {view}
        </div>

      </Paper> 
    //</div>
    
  );
}

export default React.memo(View);