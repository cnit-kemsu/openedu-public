import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { MenuIcon as useIconStyles } from './styles';

function DeleteMenuItem() {

  const iconClasses = useIconStyles();
  return <>
    <DeleteIcon className={iconClasses.root}/>
    Удалить
  </>;
}

export default React.memo(DeleteMenuItem);