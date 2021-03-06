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
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    marginRight: '8px !important'
  }
});

export const RouteNextBtn = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
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
    marginRight: '0px',
    transition: 'none'
  },
});

export const ExpansionItem = makeStyles(theme => ({
  root: {
    backgroundColor: '#0000',
    boxShadow: 'none',
    '&::before': {
      display: 'none'
    }
  },
  rootExpanded: {
    margin: '0px !important'
  },
  summaryRoot: {
    padding: '0px',
    minHeight: '0px !important'
  },
  summaryExpanded: {
    margin: '0px !important'
  },
  expandIcon: {
    order: '-1',
    marginRight: '0px',
    transition: 'none',
    marginLeft: '-14px !important'
  },
  detailsRoot: {
    flexDirection: 'column',
    paddingLeft: '10px'
  },
  detailsInner: {
    borderLeft: `1px solid ${theme.palette.primary.light}`,
    paddingLeft: '10px',
    marginLeft: '0px'
  },
  expandSummary: {
    fontSize: '14px'
  }
}));

export const DropItem = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  root_dragOver: {
    paddingTop: dragElement => (dragElement?.clientHeight || 0) + 'px'
  },
  dropArea: {
    height: '50%',
    width: '100%',
    top: '0px',
    position: 'absolute',
    minHeight: dragElement => (dragElement?.clientHeight || 0) + 'px',
    //backgroundColor: '#88888888'
  },
  dropArea_dragOver: {
    height: dragElement => `calc(50% - ${(dragElement?.clientHeight || 0) / 2}px)`,
    '&::before': {
      content: '"_"',
      display: 'block',
      width: '100%',
      height: dragElement => (dragElement?.clientHeight || 0) + 'px',
      backgroundColor: theme.palette.primary.light,
      color: 'transparent',
      opacity: '0.25'
    }
  },
}));

export const DragItem = makeStyles(theme => ({
  root_dragging: {
    opacity: '0.5'
  }
}));

export const ExpansionPanel = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    '&::before': {
      height: '0px'
    },
    margin: '12px 0px'
  },
  rootExpanded: {
    margin: '12px 0px !important'
  },
  summaryRoot: {
    padding: '0px',
    minHeight: '0px !important'
  },
  summaryContent: {
    margin: '0px',
    '& > li': {
      width: '100%'
    }
  },
  summaryExpanded: {
    margin: '0px !important'
  },
  expandIcon: {
    order: '-1',
    marginRight: '0px',
    transition: 'none'
  },
  detailsRoot: {
    flexDirection: 'column',
    paddingLeft: '48px'
  },
  summaryContent: {
    cursor: 'auto',
    width: '100%'
  },
}));