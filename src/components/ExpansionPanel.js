import React, { memo, useMemo, useEffect } from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandIcon from '@material-ui/icons/AddCircle';
import CollapseIcon from '@material-ui/icons/RemoveCircle';
import { Publisher } from '@kemsu/publisher';
import { useForceUpdate } from '@kemsu/force-update';
import { ExpansionPanel as useStyles } from './styles';

export class ExpansionContext {
  static expandEvent = new Publisher();

  static expandAll(scope) {
    ExpansionContext.expandEvent.publish(scope, true);
  }

  static collapseAll(scope) {
    ExpansionContext.expandEvent.publish(scope, false);
  }
}

class Expansion {
  constructor(defaultExpanded, forceUpdate, scope, id) {
    const historyExpanded = id ? history.state?.expansionMap?.get(id) : null;
    const expanded = defaultExpanded != null ? defaultExpanded : true;
    this.expanded = historyExpanded != null ? historyExpanded : expanded;
    this.forceUpdate = forceUpdate;
    this.scope = scope;
    this.id = id;

    this.toggleExpand = this.toggleExpand.bind(this);
    this.handleExpandEvent = this.handleExpandEvent.bind(this);
    this.handleSubscriptions = this.handleSubscriptions.bind(this);
  }

  toggleExpand(event, expanded) {
    if (this.expanded !== expanded) {
      this.expanded = expanded;
      this.saveToHistory(expanded);
      this.forceUpdate();
    }
  }

  saveToHistory(expanded) {
    if (this.id) {
      const expansionMap = history.state?.expansionMap || new Map();
      expansionMap.set(this.id, expanded);
      history.replaceState({ ...history.state, expansionMap }, document.title, location.href);
    }
  }

  handleExpandEvent(scope, expanded) {
    if (this.scope === scope && this.expanded !== expanded) {
      this.expanded = expanded;
      this.saveToHistory(expanded);
      this.forceUpdate();
    }
  }

  handleSubscriptions() {
    const sub = ExpansionContext.expandEvent.subscribe(this.handleExpandEvent);
    return () => sub.unsubscribe();
  }
}

const clickSummary = event => {
  event.stopPropagation();
};

function ExpansionPanel({ defaultExpanded, scope, summary, details, id }) {
  const forceUpdate = useForceUpdate();
  const expansion = useMemo(() => new Expansion(defaultExpanded, forceUpdate, scope, id), []);
  useEffect(expansion.handleSubscriptions, []);

  const classes = useStyles();
  return <MuiExpansionPanel square
    classes={{ root: classes.root, expanded: classes.rootExpanded }}
    expanded={expansion.expanded}
    onChange={expansion.toggleExpand}
  >
    <ExpansionPanelSummary classes={{ root: classes.summaryRoot, content: classes.summaryContent, expanded: classes.summaryExpanded, expandIcon: classes.expandIcon }}
      expandIcon={expansion.expanded ? <CollapseIcon color="primary" /> : <ExpandIcon color="primary" />}
    >
      <div className={classes.summaryContent} onClick={clickSummary}>
        {summary}
      </div>
      
    </ExpansionPanelSummary>
    <ExpansionPanelDetails className={classes.detailsRoot}>
      {details}
    </ExpansionPanelDetails>
  </MuiExpansionPanel>;
}

export default memo(ExpansionPanel);