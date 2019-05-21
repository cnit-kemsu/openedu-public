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
  addSubsectionButtonContainer: {
    padding: '32px 16px 0px 16px'
  },
  addSubsectionButton: {
    width: '100%'
  },
  subsectionsContainer: {
    padding: '0px 16px'
  }
}));