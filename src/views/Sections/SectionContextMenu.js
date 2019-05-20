import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { History, Location } from '@kemsu/router';
import EditMenuItem from '@components/EditMenuItem';
import DeleteMenuItem from '@components/DeleteMenuItem';

function routeToEditSectionView(id) { History.push(Location.path + '/edit/' + id); }
function routeToSubsectionsView(id) { History.push(Location.path + '/' + id + '/subsection'); }

export default function CourseContextMenu(close, { id, name, confirmDeleteDialog }) {

  return <>
    <MenuItem onClick={() => { routeToEditSectionView(id); }}>
      <EditMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { close(); confirmDeleteDialog.open({ id, name }); }}>
      <DeleteMenuItem />
    </MenuItem>
    <MenuItem onClick={() => { routeToSubsectionsView(id); }}>
      Структура
    </MenuItem>
  </>;
}