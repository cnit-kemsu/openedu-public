import React from 'react';
import ReactDOM from 'react-dom';
import { GraphqlProvider, useQuery } from '@kemsu/graphql-client';
import { Router, useRoute } from '@kemsu/router';
import { client } from './client';
import AuthorizeView from './Views/Authorize';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

const theme = createMuiTheme({});

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
  
  return (<>

        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: '#282828' }}>
            <Toolbar>
              {/* <IconButton edge="start" className={classes.menuButton} color="inherit">
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6" color="inherit" className={classes.title} onClick={() => Router.push('/')}>
                Открытое образование
              </Typography>
              <Button color="inherit" onClick={() => Router.push('/signin')}>Войти</Button>
            </Toolbar>
          </AppBar>
        </div>

        <div id="main-routing" style={{ textAlign: 'center' }}>
          {useRoute('/(?<variant>signin|register|verify)', props => <AuthorizeView {...props} />)}
          {useRoute('^/$', () => <div style={{ marginTop: '50px', fontSize: '25px' }}>Главная страница</div>)}
          {useRoute('^/$', () => <div style={{ marginTop: '50px', fontSize: '25px' }}>Главная страница</div>)}
          {/* {useRoute('/123/123', <div style={{ marginTop: '50px', fontSize: '25px' }}>Главная страница</div>)} */}
        </div>

      
  </>);
}

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <GraphqlProvider client={client}>
        <App></App>
      </GraphqlProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);