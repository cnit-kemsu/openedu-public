import { makeStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';

export const AnswerForm = makeStyles({
  root: {
    width: '550px'
  },
  text: {
    width: '100%'
  }
});

export const AnswerItem = makeStyles({
  root: {
    alignItems: 'baseline'
  },
  index: {
    fontWeight: 'bold'
  },
  text: {
    whiteSpace: 'pre-line'
  },
  pre: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '-4px',
    marginBottom: '4px'
  }
});

export const RightAnswerCheckbox = makeStyles({
  root: {
    color: green[400]
  },
  checked: {
    color: green[600] + ' !important'
  }
});

export const RightAnswerRadioButton = makeStyles({
  formControlLabel: {
    marginLeft: '0px !important'
  },
  radio: {
    color: green[600] + ' !important'
  }
});

export default makeStyles({
  addAnswerButton: ({ count, showError }) => ({
    minWidth: 'calc(100% - 32px)',
    margin: count > 0 || showError ? '16px 16px 0px 16px' : '32px 16px 0px 16px'
  }),
  error: {
    marginTop: '8px'
  },
  addIcon: {
    marginRight: '6px'
  }
});