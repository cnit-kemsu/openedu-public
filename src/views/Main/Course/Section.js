function renderSubsection(props, index, sectionIndex, enrolled) {
  return <Subsection key={props.id} index={index} sectionIndex={sectionIndex} enrolled={enrolled} {...props} />;
}

function Section({ name, summary, index, subsections, enrolled }) {

  const classes = useSectionStyles();
  return <div className={classes.root}>
    {name !== '0' && <div className={classes.header}>
      <ExpansionPanel disabled={!summary} classes={{ disabled: classes.disabled }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ disabled: classes.sumDisabled }}>
          <div className={classes.name}>
            {/* <Typography component="span" variant="inherit">{index}. </Typography> */}
            <Typography component="span" variant="inherit">{name}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.summary}>{summary}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>}
    <div>
      {subsections.map((props, _index) => renderSubsection(props, _index + 1, index, enrolled))}
    </div>
  </div>;
}