import React, { memo, useState, useCallback } from 'react';
import ExpansionPanel from '@material-ui/core/Accordion';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/AddCircle';
import CollapseIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';
import displayProp from '@lib/displayProp';
import { ExpansionItem as useStyles } from './styles';

function ExpansionItem({ title, summary, content }) {
  const [expanded, _setExpanded] = useState(false);
  const setExpanded = useCallback((event, _expanded) => _setExpanded(_expanded), []);

  const classes = useStyles();
  return <ExpansionPanel square
    classes={{ root: classes.root, expanded: classes.rootExpanded }}
    onChange={setExpanded}
  >
    <ExpansionPanelSummary classes={{ root: classes.summaryRoot, expanded: classes.summaryExpanded, expandIcon: classes.expandIcon }}
      expandIcon={expanded ? <CollapseIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
    >
      {displayProp(title)}
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={classes.detailsRoot}>
      <div className={classes.detailsInner}>
        <Typography className={classes.expandSummary}>{summary}</Typography>
        {displayProp(content)}
      </div>
    </ExpansionPanelDetails>
  </ExpansionPanel>;
}

export default memo(ExpansionItem);