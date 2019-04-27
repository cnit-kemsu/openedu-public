import React from 'react';
import ReactDOM from 'react-dom';
import { GraphqlProvider } from '@kemsu/graphql-client';
import { History, useRoute } from '@kemsu/router';
import { client } from './client';
import { UserInfo } from './classes/UserInfo';
import DefaultLayout from './Layouts/Default';
import AdminLayout from './Layouts/Admin';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

console.log(UserInfo.verified);
if (UserInfo.verified === 'false') History.replace('/account/verify');

const theme = createMuiTheme({
  overrides: {
    // MuiButton: {
    //   label: {
    //     fontWeight: 'bold'
    //   }
    // }
    MuiMenuItem: {
      root: {
        padding: '0px'
      }
    }
  }
});

function App() {

  console.log('render App');
  
  return <>
    <CssBaseline />
    {useRoute(/^\/admin\//, <AdminLayout />) || <DefaultLayout />}
  </>;
}

function Root() {
  return <ThemeProvider theme={theme}>
    <GraphqlProvider client={client}>
      <App></App>
    </GraphqlProvider>
  </ThemeProvider>;
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);