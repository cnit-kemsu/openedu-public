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
  },
  accessPeriod: {
    width: '48%',
    marginRight: '4%'
  },
  expirationPeriod: {
    width: '48%'
  },
  accessDate: {
    width: '40%',
    marginRight: '24px'
  },
  expirationDate: {
    width: '40%'
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
  units: {
    padding: '0px 16px'
  },
  addUnitButton: ({ count }) => ({
    width: 'calc(100% - 32px)',
    margin: count > 0 ? '16px 16px 32px 16px' : '32px 16px 32px 16px'
  }),
  addIcon: {
    marginRight: '6px'
  }
}));