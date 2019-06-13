import { makeStyles } from "@material-ui/core/styles";

export const AnswerForm = makeStyles({
  root: {
    width: '550px'
  },
  text: {
    width: '100%'
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