import React, { memo, useState, useCallback } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/AddCircle';
import CollapseIcon from '@material-ui/icons/RemoveCircle';
import displayProp from '@lib/displayProp';
import { MoreText as useStyles } from './styles';

function MoreText({ title, content }) {
  const [expanded, _setExpanded] = useState(false);
  const setExpanded = useCallback((event, _expanded) => _setExpanded(_expanded), []);

  const classes = useStyles();
  return <ExpansionPanel onChange={setExpanded} square>
    <ExpansionPanelSummary classes={{ root: classes.summaryRoot, expandIcon: classes.expandIcon }}
      expandIcon={expanded ? <CollapseIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
    >
      {displayProp(title)}
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {displayProp(content)}
    </ExpansionPanelDetails>
  </ExpansionPanel>;
}

export default memo(MoreText);