import React from 'react';
import ReactDOM from 'react-dom';
import { GraphqlProvider, useQuery } from '@kemsu/graphql-client';
import { History, useRoute } from '@kemsu/router';
import { client } from './client';
import { UserInfo } from './classes/UserInfo';
import AppBar from './AppBar';
import PageNotFound from './PageNotFound';
import AuthorizeView from './Views/Authorize';
import UsersView from './Views/Users';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

console.log(UserInfo.verified);
if (UserInfo.verified === 'false') History.push('/account/verify');

// const studentsQuery = `
//   query students($limit: Int!) {
//     students(limit: $limit) {
//       id
//       verified
//       email
//     }
//   }
// `;

// function Students() {

//   console.log('render Users');
//   const [data, , loading, ] = useQuery(studentsQuery, { limit: 10 }, {
//     onComplete: () => console.log('fetch users success'),
//     onError: console.error
//   });

//   if (localStorage.getItem('authtoken') === undefined) return (
//     <div>Not authorized to show</div>
//   );

//   return (<>
//     {loading ? 'loading...' : (
//       data.students?.map(
//         ({ id, verified, email }) => <div key={id}>
//           <div>id: {id}</div>
//           <div>email: {email}</div>
//           <div>verified: {verified}</div>
//         </div>
//       )
//     )}
//   </>);
// }

const theme = createMuiTheme({
  // overrides: {
  //   MuiButton: {
  //     label: {
  //       fontWeight: 'bold'
  //     }
  //   }
  // }
});

function Routing() {
  console.log('routing');
  return <>
    {useRoute(/\/account\/(?<variant>signin|signup|verify)/, props => <AuthorizeView {...props} />)}
    {useRoute(/\/users/, props => <UsersView {...props}/>)}
    {useRoute(/^\/$/, () => <div style={{ marginTop: '50px', fontSize: '25px' }}>
      Главная страница
      <Button onClick={() => History.push('/users')}>Users</Button>
    </div>)}
    {useRoute(<PageNotFound />)}
  </>;
}


function App() {

  console.log('render App');
  
  return <>
    <AppBar />
    <Routing />
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