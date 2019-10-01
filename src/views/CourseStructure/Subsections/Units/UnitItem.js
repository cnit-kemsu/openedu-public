import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { useMutation, refetch } from '@kemsu/graphql-client';
import MoreIconButton from '@components/MoreIconButton';
import FrontItemDropArea from '@components/FrontItemDropArea';
import { UnitItem as useStyles } from './styles';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '../../';
import { Notifications } from '@kemsu/core';

const types = {
  DOCUMENT: 'Документ',
  FILE_DOCUMENT: 'Файл-документ',
  VIDEO: 'Видео',
  QUIZ: 'Тест'
};

const draggerStyle = {
  backgroundImage: '-webkit-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%)',
  backgroundSize: '3px 3px',
  width: '18px',
  height: '18px',
  cursor: 'grabbing',
  display: 'inline-block',
  marginRight: '4px',
  transform: 'translate(0px, 2px)'
};

export const MOVE_COURSE_DESIGN_UNIT = ({
  movableKey = 'Int!',
  frontKey = 'Int'
}) => `
  moveCourseDesignUnit(
    movableUnitId: ${movableKey}
    frontUnitId: ${frontKey}
  )
`;
export const MOVE_COURSE_DELIVERY_UNIT = ({
  movableKey = 'Int!',
  frontKey = 'Int'
}) => `
  moveCourseDeliveryUnit(
    movableUnitId: ${movableKey}
    frontUnitId: ${frontKey}
  )
`;
export function onComplete(isDelivery) {
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Порядок блоков был успешно изменен.', 'success');
}

export default function UnitItem({ index, id, type, ...item }, { unitMenu, subsectionIndex, isDelivery, ...props }) {

  const moveCourseDesignUnit = useMutation(isDelivery ? MOVE_COURSE_DELIVERY_UNIT : MOVE_COURSE_DESIGN_UNIT, { onComplete: () => onComplete(isDelivery) });

  const classes = useStyles();
  const unitIndex = index + 1 |> subsectionIndex + '.' + #;
  const primary = <>
    <span style={draggerStyle} draggable={true} onDragStart={event => { event.dataTransfer.setData('text/plain', id); }} />
    <span className={classes.index}>{unitIndex}</span>. {item.name} ({types[type]})
  </>;
  return <div>
    <FrontItemDropArea frontKey={id} onDrop={(movableKey, frontKey) => moveCourseDesignUnit({ movableKey, frontKey })} />
    <ListItem>
      <ListItemText primary={primary} secondary={item.summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => unitMenu.open(event, { id, item, subsectionIndex, ...props })} />
      </ListItemSecondaryAction>
    </ListItem>
  </div>;
}