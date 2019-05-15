import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import { History, useRoute } from '@kemsu/router';
import { Notifier } from '@kemsu/core';
import { setAuthHeader } from '@lib/client';
import { UserInfo } from '@lib/UserInfo';
import { allowedToAdmin } from '@lib/auth';
import DefaultLayout from '@layouts/Default';
import AdminLayout from '@layouts/Admin';
import { drawerWidth } from '@components/Drawer';

import CssBaseline from '@material-ui/core/CssBaseline';

setAuthHeader(UserInfo.bearer);
if (UserInfo.verified === 'false') History.replace('/account/verify');
else if (UserInfo.complete === 'false') History.replace('/account/complete');

const theme = createMuiTheme({
  overrides: {
    // MuiButton: {
    //   label: {
    //     fontWeight: 'bold'
    //   }
    // }
    // MuiMenuItem: {
    //   root: {
    //     padding: '0px'
    //   }
    // }
    MuiListItem: {
      secondaryAction: {
        paddingRight: '64px'
      }
    }
  }
});

function App() {
  console.log('render App');

  return useRoute(/^\/admin/)
  |> <>
    {# && (allowedToAdmin() ? <AdminLayout /> : <DefaultLayout notAuthorized />) || <DefaultLayout />}
    <Notifier marginLeft={# && drawerWidth} />
  </>;
}

function Root() {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>;
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);