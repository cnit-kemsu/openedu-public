import { makeStyles } from "@material-ui/core/styles";

export const BlockForm = makeStyles({
  root: {
    width: '550px'
  },
  name: {
    width: '100%'
  },
  summary: {
    width: '100%'
  },
  type: {
    width: '300px'
  }
});

export const BlockItem = makeStyles(theme => ({
  root: {

  },
  listItem: {
    
  }
}));

export const TextBlockForm = makeStyles({
  root: {
    width: '550px',
    padding: '32px 24px',
  },
  text: {
    width: '100%'
  }
});

export const VideoBlockForm = makeStyles({
  root: {
    width: '550px',
    padding: '32px 24px',
  },
  video: {
    width: '100%'
  }
});

export const Question = makeStyles(theme => ({
  root: {
    minWidth: '800px',
    marginBottom: '48px',
    padding: '32px 24px',
  }
}));

export const QuestionForm = makeStyles(theme => ({
  root: {
    width: '550px'
  },
  text: {
    width: '100%'
  }
}));

export const EditQuizBlock = makeStyles(theme => ({
  root: {

  },
}));