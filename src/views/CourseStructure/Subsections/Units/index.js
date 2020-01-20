import React, { useCallback } from 'react';
import { Notifications, useElementArray, List } from '@kemsu/core';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { DropItem } from '@components/DragAndDropItems';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '../../';
import UnitItem from './UnitItem';

const MOVE_COURSE_DESIGN_UNIT = ({
  movingKey = 'Int!',
  putBeforeKey = 'Int'
}) => `
  moveCourseDesignUnit(
    movingUnitId: ${movingKey}
    putBeforeUnitId: ${putBeforeKey}
  )
`;
const MOVE_COURSE_DELIVERY_UNIT = ({
  movingKey = 'Int!',
  putBeforeKey = 'Int'
}) => `
  moveCourseDeliveryUnit(
    movingUnitId: ${movingKey}
    putBeforeUnitId: ${putBeforeKey}
  )
`;
function onComplete(isDelivery) {
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Порядок блоков был успешно изменен.', 'success');
}

function Units({ units, ...props }) {
  const _moveUnit = useMutation(props.isDelivery ? MOVE_COURSE_DELIVERY_UNIT : MOVE_COURSE_DESIGN_UNIT, { onComplete: () => onComplete(props.isDelivery) });
  const moveUnit = useCallback((dragData, dropData) => _moveUnit({ movingKey: dragData, putBeforeKey: dropData }), []);

  const dragScope = 'unit' + props.subsectionIndex;
  
  return units.length > 0 && <List>
    {units?.map((unit, index) => <UnitItem {...{ key: unit.id, index, unit, dragScope, moveUnit, ...props }} />)}
    <DropItem index={units?.length} onDrop={moveUnit} scope={dragScope} />
  </List>;
}

export default React.memo(Units);
