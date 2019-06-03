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
  subsections: {
    padding: '0px 16px'
  },
  addSubsectionButton: ({ count }) => ({
    width: '100%',
    padding: count > 0 ? '0px 16px 0px 16px' : '32px 16px 0px 16px'
  }),
});