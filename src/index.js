import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import { GraphqlProvider } from '@kemsu/graphql-client';
import { History, useRoute } from '@kemsu/router';
import { client } from '@lib/client';
import { UserInfo } from '@lib/UserInfo';
import DefaultLayout from '@layouts/Default';
import AdminLayout from '@layouts/Admin';

import CssBaseline from '@material-ui/core/CssBaseline';

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
  }
});

function App() {

  console.log('render App');
  
  return <>
    {useRoute(/^\/admin/, <AdminLayout />) || <DefaultLayout />}
  </>;
}

function Root() {
  return <ThemeProvider theme={theme}>
    <GraphqlProvider client={client}>
      <CssBaseline />
      <App />
    </GraphqlProvider>
  </ThemeProvider>;
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);