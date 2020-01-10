import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@kemsu/core';
import displayProp from '@lib/displayProp';
import { ExpansionItem as useStyles } from './styles';

function Unit({ id, name, summary, hasAccess, subsectionId }) {

  const classes = useStyles();
  return <div className={classes.root}>
    {displayProp(hasAccess ? <Link styled path={`/delivery-subsection/${subsectionId}?unitId=${id}`}>{name}</Link> : name)}
    <Typography style={{ fontSize: '12px' }}>{summary}</Typography>
  </div>;
}

export default memo(Unit);