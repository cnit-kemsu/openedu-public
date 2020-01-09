import React, { memo } from 'react';
import displayProp from '@lib/displayProp';
import { MoreText as useStyles } from './styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/AddCircle';

function MoreText({ header, content }) {
  const classes = useStyles();
  return <ExpansionPanel square>
    <ExpansionPanelSummary classes={{ root: classes.summaryRoot, expandIcon: classes.expandIcon }} expandIcon={<ExpandMoreIcon color="primary" />}>
      {displayProp(header)}
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {displayProp(content)}
    </ExpansionPanelDetails>
  </ExpansionPanel>;
}

export default memo(MoreText);