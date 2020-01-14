import React from 'react';
import { Editor } from '@kemsu/editor';
import { Document as useStyles } from './styles';

function Document({ data }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <Editor editorState={data} readOnly={true} />
  </div>;
}

export default React.memo(Document);