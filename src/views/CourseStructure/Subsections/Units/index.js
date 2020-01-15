import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useElementArray, List } from '@kemsu/core';
import { DropItem } from '@components/DragAndDropItems';
import UnitItem, { MOVE_COURSE_DESIGN_UNIT, MOVE_COURSE_DELIVERY_UNIT, onComplete } from './UnitItem';

function Units({ units, ...props }) {
  const dragType = 'unit' + props.subsectionIndex;
  const moveUnit = useMutation(props.isDelivery ? MOVE_COURSE_DELIVERY_UNIT : MOVE_COURSE_DESIGN_UNIT, { onComplete: () => onComplete(props.isDelivery) });
  const unitItems = useElementArray(UnitItem, units, { ...props, dragType, moveUnit });
  
  return units.length > 0 && <List>
    {unitItems}
    <DropItem onDrop={moveUnit} dragType={dragType} />
  </List>;
}

export default React.memo(Units);
