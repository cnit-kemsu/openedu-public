import { makeStyles } from "@material-ui/core/styles";

export const Question = makeStyles(theme => ({
  root: {
    minWidth: '800px',
    marginBottom: '48px',
    padding: '32px 24px',
  },
  addAnswerButtonContainer: {
    padding: '0px 16px 0px 16px'
  },
  addAnswerButtonContainerAlone: {
    padding: '32px 16px 0px 16px'
  },
  addAnswerButtonButton: {
    width: '100%'
  }
}));

export const Answer = makeStyles(theme => ({
}));

export const QuestionForm = makeStyles(theme => ({
  root: {
    width: '550px'
  },
  text: {
    width: '100%'
  }
}));

export const AnswerForm = makeStyles(theme => ({
  root: {
    width: '550px'
  },
  text: {
    width: '100%'
  }
}));

export default makeStyles(theme => ({
  root: {
    minWidth: '800px'
  },
  addQuestionButtonContainer: {
    padding: '0px 16px 0px 16px'
  },
  addQuestionButtonContainerAlone: {
    padding: '32px 16px 0px 16px'
  },
  addQuestionButtonButton: {
    width: '100%'
  }
}));