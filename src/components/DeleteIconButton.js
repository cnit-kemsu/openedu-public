import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function CloseIconButton(props) {
  return <IconButton edge="end" {...props}>
    <CloseIcon />
  </IconButton>;
}

export default React.memo(CloseIconButton);