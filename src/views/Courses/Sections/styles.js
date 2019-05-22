import { makeStyles } from "@material-ui/core/styles";

export const SectionForm = makeStyles({
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

export const SectionItem = makeStyles(theme => ({
  root: {
    minWidth: '800px',
    marginBottom: '48px',
    padding: '32px 24px',
  },
  listItem: {
  },
  addSubsectionButtonContainer: {
    padding: '0px 16px 0px 16px'
  },
  addSubsectionButtonContainerAlone: {
    padding: '32px 16px 0px 16px'
  },
  addSubsectionButton: {
    width: '100%'
  },
  subsectionsContainer: {
    padding: '0px 16px'
  }
}));