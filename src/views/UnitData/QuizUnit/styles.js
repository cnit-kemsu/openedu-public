import { makeStyles } from "@material-ui/core/styles";

export const Parameters = makeStyles({
  root: {
    width: '400px',
    padding: '32px 24px',
    marginBottom: '32px'
  },
  totalAttempts: {
    width: '100%'
  },
  timeLimit: {
    width: '100%'
  },
  maxScore: {
    width: '100%'
  },
  finalCertificationLabel: {
    display: 'inline-block'
  }
});

export default makeStyles({
  root: {
    minWidth: '800px'
  }
});