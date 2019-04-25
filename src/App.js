import React from 'react';
import ReactDOM from 'react-dom';
import { GraphqlProvider } from '@kemsu/graphql-client';
import { History, useRoute } from '@kemsu/router';
import { client } from './client';
import { UserInfo } from './classes/UserInfo';
import AppBar from './AppBar';
import NavDrawer from './NavDrawer';
import Routing from './Routing';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

console.log(UserInfo.verified);
if (UserInfo.verified === 'false') History.push('/account/verify');

const theme = createMuiTheme({
  // overrides: {
  //   MuiButton: {
  //     label: {
  //       fontWeight: 'bold'
  //     }
  //   }
  // }
});

function App() {

  console.log('render App');
  
  return <>
    <CssBaseline />
    {useRoute(/^\/admin/, <NavDrawer />)}
    <div style={{ width: '100%' }}>
      <AppBar />
      <Routing />
    </div>
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