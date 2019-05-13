import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { refetch } from '@kemsu/graphql-client';
import { RefreshBtn as useStyles } from './styles';

function RefreshBtn({ queries }) {
  const [disabled, toggleDisabled] = useState(false);
  const _refetch = useCallback(
    async () => {
      toggleDisabled(true);
      await refetch(...queries);
      toggleDisabled(false);
    },
    [...queries]
  );

  const classes = useStyles();
  return <IconButton disabled={disabled} className={classes.root} onClick={_refetch}>
    <RefreshIcon />
  </IconButton>;
}

export default React.memo(RefreshBtn);