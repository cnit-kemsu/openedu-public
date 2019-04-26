import React, { useMemo, useEffect } from 'react';
import { useForceUpdate } from '@kemsu/force-update';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBarContent } from '../../classes/AppBarContent';
import { AppBar as useStyles } from './styles';

function AdminAppBar() {
  const forceUpdate = useForceUpdate();
  const appBar = (() => new AppBarContent(forceUpdate)) |> useMemo(#, []);
  useEffect(appBar.handleUpdateEventSubscription, []);

  const classes = useStyles();
  return <div>
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {AppBarContent.content}
      </Toolbar>
    </AppBar>
  </div>;
}

export default React.memo(AdminAppBar);