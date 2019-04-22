import React from 'react';
import ReactDOM from 'react-dom';
import { GraphqlProvider, useQuery } from '@kemsu/graphql-client';
import { Router, useRoute, useDefaultRoute } from '@kemsu/router';
import { client } from './client';
import { UserInfo } from './classes/UserInfo';
import PageNotFound from './PageNotFound';
import AuthorizeView from './Views/Authorize';
import AuthInfo from './Views/AuthInfo';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

console.log(UserInfo.verified);
if (UserInfo.verified === 'false') Router.push('/account/verify');

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
  overrides: {
    MuiButton: {
      label: {
        //fontWeight: 'bold'
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  // root: {
  //   flexGrow: 1,
  // },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



function App() {

  console.log('render App');

  const classes = useStyles();
  
  return <>
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#282828' }}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" color="inherit" className={classes.title} onClick={() => Router.push('/')}>
            Открытое образование
          </Typography>
          <AuthInfo />
        </Toolbar>
      </AppBar>
    </div>

    {useRoute('/account/(?<variant>signin|create|verify)', props => <AuthorizeView {...props} />)}
    {useRoute('^/$', () => <div style={{ marginTop: '50px', fontSize: '25px' }}>Главная страница</div>)}
    {useDefaultRoute(PageNotFound)}
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