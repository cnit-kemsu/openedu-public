import React from 'react';
import { History, useRoutes } from '@kemsu/router';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import pageNotFound from '@components/PageNotFound';
import SignIntoAccountView from './SignIn';
import SignUpAccountView from './SignUp';
import VerifyAccountView from './Verify';
import ConfirmAccountView from './Confirm';
import CompleteAccountView from './Complete';
import useStyles from './styles';

function handleTabChange(event, value) {
  if (value === 0) History.push('/account/signin');
  if (value === 1) History.push('/account/signup');
}

const routes = [
  [/.+\/signin$/, () => ([<SignIntoAccountView />, 0])],
  [/.+\/signup$/, () => ([<SignUpAccountView />, 1])],
  [/.+\/verify$/, () => ([<VerifyAccountView />])],
  [/.+\/confirm$/, () => ([<ConfirmAccountView />])],
  [/.+\/complete$/, () => ([<CompleteAccountView />])]
];

function AccountView() {
  const [view, tabValue] = useRoutes(routes) || [];
  
  const classes = useStyles();
  return view === undefined
  ? pageNotFound
  : <div className={classes.root}>
      <Paper className={classes.paper}>

        {tabValue !== undefined &&
          <Tabs value={tabValue} onChange={handleTabChange}
            indicatorColor="primary" textColor="primary" className={classes.tabs}
          >
            <Tab label="Войти" className={classes.tab} />
            <Tab label="Регистрация" className={classes.tab} />
          </Tabs>
        }

        <div>
          {view}
        </div>

      </Paper>
    </div>;
}

export default React.memo(AccountView);