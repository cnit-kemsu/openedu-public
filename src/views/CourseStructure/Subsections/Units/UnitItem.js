import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreIconButton from '@components/MoreIconButton';
import { DragItem, DropItem } from '@components/DragAndDropItems';
//import { UnitItem as useStyles } from './styles';
import { useHash } from '@views/_shared/useHash';

const types = {
  DOCUMENT: 'Документ',
  FILE_DOCUMENT: 'Файл-документ',
  VIDEO: 'Видео',
  QUIZ: 'Тест'
};

export default function UnitItem({ index, id, type, ...item }, { unitMenu, subsectionIndex, /*isDelivery,*/ moveUnit, dragScope, ...props }) {

  useHash(`#${id}`);

  //const classes = useStyles();
  //const unitIndex = index + 1 |> subsectionIndex + '.' + #;
  return <div>
    <DragItem index={index} dragData={id} dragElement={`<div>${item.name}</div>`} scope={dragScope}>
      <DropItem index={index} dropData={id} onDrop={moveUnit} scope={dragScope}>
        <ListItem id={id}>
          <ListItemText primary={`${item.name} (${types[type]}`} secondary={item.summary} />
          <ListItemSecondaryAction>
            <MoreIconButton onClick={event => unitMenu.open(event, { id, item, subsectionIndex, ...props })} />
          </ListItemSecondaryAction>
        </ListItem>
      </DropItem>
    </DragItem>
  </div>;
}