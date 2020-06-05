import { makeStyles } from '@material-ui/core/styles';

export const Header = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderBottom: '1px solid rgba(0, 0, 0, 0.28)',
    boxShadow: '0px 4px 8px -2px rgba(0,0,0,0.2), 0px 8px 10px 0px rgba(0,0,0,0.14), 0px 2px 20px 0px rgba(0,0,0,0.12)'
  },
  inner: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '64px 0px 64px 0px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '720px',
    paddingRight: '48px'
  },
  price: {
    fontWeight: 'bold',
    marginLeft: '16px'
  },
  priceContainer: {
    display: 'inline-flex',
    alignItems: 'baseline'
  },
  name: {
    paddingBottom: '12px'
  },
  summary: {
    paddingBottom: '12px'
  },
  purchaseButton: {
    marginTop: '12px'
  },
  pictureContainer: {
    maxWidth: '480px',
    maxHeight: '300px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  },
  picture: {
    //border: `1px solid ${theme.palette.primary.light}`,
    width: '100%',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
  }
}));

export const Description = makeStyles(theme => ({
  root: {
  },
  inner: {
    paddingBottom: '12px',
    maxWidth: '1200px',
    margin: 'auto',
    paddingTop: '64px ',
    display: 'flex',
    justifyContent: 'space-between',
  },
  main: {
    width: '70%',
    paddingRight: '48px',
    '& h5': {
      paddingBottom: '12px'
    },
    '& > div.section': {
      paddingBottom: '24px'
    }
  },
  info: {
    width: '30%',
    '& table': {
      width: '100%',
      borderSpacing: '0px',
      marginBottom: '32px',
      '& tbody': {
        '& tr:not(:last-child)': {
          '& td': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
          }
        }
      }
    }
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  logo: {
    maxHeight: '200px'
  },
  tabs: {
    marginBottom: '32px'
  },
  tab: {
    fontWeight: 'bold'
  }
}));

export const InfoItem = makeStyles({
  root: {
    '& td': {
      paddingTop: '12px',
      paddingBottom: '12px',
      color: 'rgba(0, 0, 0, 0.72)',
      fontWeight: 'bold'
    }
  },
  icon: {
    paddingRight: '8px'
  },
  name: {
    paddingRight: '36px'
  }
});

export default makeStyles({
  root: {
  }
});