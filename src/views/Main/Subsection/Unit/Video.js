import React from 'react';
import { Video as useStyles } from './styles';

function Video({ data }) {

  const classes = useStyles();
  return <div>
    <iframe className={classes.iframe} src={data.url}
      //sandbox 
      frameBorder="0"
      //allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>;
}

export default React.memo(Video);