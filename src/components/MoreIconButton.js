import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

function MoreIconButton(props) {
  return <IconButton edge="end" {...props}>
    <MoreVert />
  </IconButton>;
}

export default React.memo(MoreIconButton);