import { makeStyles } from "@material-ui/core/styles";

export const QuestionForm = makeStyles({
  root: {
    width: '550px'
  },
  text: {
    width: '100%'
  }
});

export const QuestionItem = makeStyles({
  root: {
    minWidth: '800px',
    marginBottom: '32px',
    padding: '32px 24px',
  }
});

export default makeStyles({
  addQuestionButton: {
    minWidth: 'calc(100% - 32px)',
    margin: '0px 16px 0px 16px'
  },
  addIcon: {
    marginRight: '6px'
  }
});