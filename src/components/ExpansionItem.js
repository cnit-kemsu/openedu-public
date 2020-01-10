import React, { memo } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import displayProp from '@lib/displayProp';
import { ExpansionItem as useStyles } from './styles';

function ExpansionItem({ title, summary, content }) {
  const classes = useStyles();
  return <ExpansionPanel classes={{ root: classes.root, expanded: classes.rootExpanded }} square>
    <ExpansionPanelSummary classes={{ root: classes.summaryRoot, expanded: classes.summaryExpanded, expandIcon: classes.expandIcon }} expandIcon={<ExpandMoreIcon color="primary" />}>
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