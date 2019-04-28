import React from 'react';
import { useRoutes } from '@kemsu/router';
import { Breadcrumbs } from '@kemsu/core';
import AppBar from './AppBar';
import pageNotFound from '../../PageNotFound';
import UsersView from './Views/Users';
import Paper from '@material-ui/core/Paper';
import { Routing as useStyles } from './styles';
import { TextCrumb } from './Views/_shared';

const routes = [
  [/\/admin\/users/, UsersView]
];

function Routing() {

  const classess = useStyles();
  return useRoutes(routes)
  |> # === undefined && pageNotFound
  || <>
    <AppBar>{#[0]}</AppBar>
    <div className={classess.root}>
      <Breadcrumbs className={classess.breadcrumbs} path={[
        <TextCrumb>Администрирование</TextCrumb>,
        ...#[1]
      ]} />
      <Paper className={classess.paper}>{#[2]}</Paper>
    </div>;
  </>;
}

export default React.memo(Routing);