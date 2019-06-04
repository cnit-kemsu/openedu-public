import { makeStyles } from "@material-ui/core/styles";

export const SubsectionForm = makeStyles({
  root: {
    width: '550px'
  },
  name: {
    width: '100%'
  },
  summary: {
    width: '100%'
  }
});

export const SubsectionItem = makeStyles(theme => ({
  root: {
  },
  listItem: {
    backgroundColor: theme.palette.grey[200]
  },
  index: {
    fontWeight: 'bold'
  },
  blocks: {
    padding: '0px 16px'
  },
  addBlockButton: {
    width: 'calc(100% - 32px)',
    margin: '32px 16px 32px 16px'
  },
  addIcon: {
    marginRight: '6px'
  }
}));