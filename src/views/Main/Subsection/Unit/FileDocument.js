import React from 'react';
import { FileDocument as useStyles } from './styles';

function FileDocument({ data }) {

  const classes = useStyles();
  return <div>
    <iframe className={classes.iframe}
      src={'/files/' + data.fileSourceKey}
      frameBorder="0"
    />
  </div>;
}

export default React.memo(FileDocument);