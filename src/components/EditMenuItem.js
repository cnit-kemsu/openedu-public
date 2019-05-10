import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { MenuIcon as useIconStyles } from './styles';

function EditMenuItem() {

  const iconClasses = useIconStyles();
  return <>
    <EditIcon className={iconClasses.root}/>
    Изменить
  </>;
}

export default React.memo(EditMenuItem);