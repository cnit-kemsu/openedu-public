import { makeStyles } from "@material-ui/core/styles";

export const PageNotFound = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    minHeight: '25%',
    margin: 'auto',
    padding: '64px'
  },
  paper: {
    padding: '32px'
  }
});

export const NotAuthorizedPage = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    minHeight: '25%',
    margin: 'auto',
    padding: '64px'
  },
  paper: {
    padding: '32px'
  }
});

export const Logo = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontWeight: 'bold',
    marginRight: '12px',
    color: 'inherit'
  },
  title: {
    color: 'inherit'
  }
});

export const RouteBackBtn = makeStyles({
  root: {
    marginRight: '8px !important'
  }
});

export const RouteNextBtn = makeStyles({
  root: {
    marginLeft: '8px !important'
  }
});

export const RefreshBtn = makeStyles({
  root: {
    marginLeft: '0px !important'
  }
});

export const MenuIcon = makeStyles({
  root: {
    marginRight: '8px'
  }
});

export const MoreText = makeStyles({
  summaryRoot: {
    padding: '0px 12px 0px 12px'
  },
  expandIcon: {
    order: '-1',
    marginRight: '0px'
  },
});

export const ExpansionItem = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    '&::before': {
      height: '0px'
    }
  },
  rootExpanded: {
    margin: '0px !important'
  },
  summaryRoot: {
    padding: '0px 12px 0px 12px',
    minHeight: '0px !important'
  },
  summaryExpanded: {
    margin: '0px !important'
  },
  expandIcon: {
    order: '-1',
    marginRight: '0px'
  },
  detailsRoot: {
    flexDirection: 'column'
  },
  detailsInner: {
    borderLeft: `1px solid ${theme.palette.primary.light}`,
    paddingLeft: '12px',
    marginLeft: '12px'
  },
  expandSummary: {
    fontSize: '14px'
  }
}));