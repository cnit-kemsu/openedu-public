import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function displayAvatar(picture) {
  return picture != null
    ? <Avatar src={'/files/' + picture.fileSourceKey} />
    : <Avatar><AccountCircle /></Avatar>;
};