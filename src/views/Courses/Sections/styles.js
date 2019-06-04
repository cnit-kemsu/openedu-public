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

export const SectionItem = makeStyles({
  root: {
    minWidth: '800px',
    marginBottom: '48px',
    padding: '32px 24px',
  },
  index: {
    fontWeight: 'bold'
  },
  subsections: {
    padding: '0px 16px'
  },
  addSubsectionButton: ({ count }) => ({
    width: 'calc(100% - 32px)',
    margin: count > 0 ? '0px 16px 0px 16px' : '32px 16px 0px 16px'
  }),
  addIcon: {
    marginRight: '6px'
  }
});