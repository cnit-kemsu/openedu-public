import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useMutation, refetch } from '@kemsu/graphql-client';
import MoreIconButton from '@components/MoreIconButton';
import { DragItem, DropItem } from '@components/DragAndDropItems';
import { UnitItem as useStyles } from './styles';
// import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '../../';
import { Notifications } from '@kemsu/core';
import { useHash } from '@views/_shared/useHash';

const types = {
  DOCUMENT: 'Документ',
  FILE_DOCUMENT: 'Файл-документ',
  VIDEO: 'Видео',
  QUIZ: 'Тест'
};

// export const MOVE_COURSE_DESIGN_UNIT = ({
//   movingKey = 'Int!',
//   putBeforeKey = 'Int'
// }) => `
//   moveCourseDesignUnit(
//     movingUnitId: ${movingKey}
//     putBeforeUnitId: ${putBeforeKey}
//   )
// `;
// export const MOVE_COURSE_DELIVERY_UNIT = ({
//   movingKey = 'Int!',
//   putBeforeKey = 'Int'
// }) => `
//   moveCourseDeliveryUnit(
//     movingUnitId: ${movingKey}
//     putBeforeUnitId: ${putBeforeKey}
//   )
// `;
// export function onComplete(isDelivery) {
//   refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
//   Notifications.push('Порядок блоков был успешно изменен.', 'success');
// }

export default function UnitItem({ index, id, type, ...item }, { unitMenu, subsectionIndex, isDelivery, moveUnit, dragScope, ...props }) {

  useHash(`#${id}`);
  //const moveUnit = useMutation(isDelivery ? MOVE_COURSE_DELIVERY_UNIT : MOVE_COURSE_DESIGN_UNIT, { onComplete: () => onComplete(isDelivery) });

  const classes = useStyles();
  const unitIndex = index + 1 |> subsectionIndex + '.' + #;
  const primary = <>
    {/* <span style={draggerStyle} draggable={true} onDragStart={event => { event.dataTransfer.setData('text/plain', id); }} /> */}
    {/*<span className={classes.index}>{unitIndex}</span>.*/} {item.name} ({types[type]})
  </>;
  //const dragType = 'unit' + subsectionIndex;
  return <div>
    <DragItem index={index} dragData={id} dragElement={`<div>${item.name}</div>`} scope={dragScope}>
      <DropItem index={index} dropData={id} onDrop={moveUnit} scope={dragScope}>
        <ListItem id={id}>
          <ListItemText primary={primary} secondary={item.summary} />
          <ListItemSecondaryAction>
            <MoreIconButton onClick={event => unitMenu.open(event, { id, item, subsectionIndex, ...props })} />
          </ListItemSecondaryAction>
        </ListItem>
      </DropItem>
    </DragItem>
  </div>;
}