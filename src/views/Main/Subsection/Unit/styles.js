import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    margin: 'auto',
    width: 'fit-content',
    maxWidth: '1200px',
    paddingTop: '64px'
  }
}));

export const FileDocument = makeStyles(theme => ({
  iframe: {
    width: '1100px',
    height: '1200px'
  }
}));

export const Document = makeStyles(theme => ({
  root: {
    margin: '0px 64px 0px 64px'
  }
}));

export const Video = makeStyles(theme => ({
  iframe: {
    width: '853px',
    height: '480px'
  }
}));