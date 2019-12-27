function Subsection({ id, name, summary, sectionIndex, enrolled, index, accessDate, expirationDate }) {

  const isAdmin = UserInfo.role === 'admin' || UserInfo.role === 'superuser';
  const _enrolled = enrolled || isAdmin;
  const nowDate = new Date();
  const access = accessDate ? nowDate > new Date(accessDate) || isAdmin : true;
  //access = expirationDate ? nowDate < new Date(expirationDate) : access;

  const classes = useSubsectionStyles();
  return <div className={classes.root}>
    <ExpansionPanel disabled={!summary} classes={{ disabled: classes.disabled }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ disabled: classes.sumDisabled }}>
        <div>
          {_enrolled
            ? <div>
              {access
                ? <Link className={classes.nameEnrolled} styled path={`/delivery-subsection/${id}`}>
                  {/* <Typography variant="inherit" component="span">{sectionIndex}.{index}. </Typography> */}
                  <Typography variant="inherit" component="span">
                    {name}
                  </Typography>
                </Link>
                : <div>
                  {/* <Typography variant="inherit" component="span">{sectionIndex}.{index}. </Typography> */}
                  <Typography variant="inherit" component="span">
                    {name}
                  </Typography>
                </div>
              }
              {accessDate || expirationDate ?
                <div className={classes.dates}>
                  {accessDate && <Typography component="span" variant="inherit">открытие доступа: {dispdate(accessDate)}</Typography>}
                  {accessDate && expirationDate ? <Typography component="span" variant="inherit">, </Typography> : null}
                  {expirationDate && <Typography component="span" variant="inherit">закрытие доступа: {dispdate(expirationDate)}</Typography>}
                </div>  
              : null}
            </div>
            : <div className={classes.name}><Typography component="span" variant="inherit">{sectionIndex}.{index}. </Typography><Typography variant="inherit" component="span">{name}</Typography></div>
          }
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography className={classes.summary}>{summary}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>;
}