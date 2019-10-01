import React from 'react';
import { useMutation } from '@kemsu/graphql-client';
import { useElementArray, List } from '@kemsu/core';
import FrontItemDropArea from '@components/FrontItemDropArea';
import UnitItem, { MOVE_COURSE_DESIGN_UNIT, MOVE_COURSE_DELIVERY_UNIT, onComplete } from './UnitItem';

function Units({ units, ...props }) {
  const unitItems = useElementArray(UnitItem, units, props);
  const moveCourseDesignUnit = useMutation(props.isDelivery ? MOVE_COURSE_DELIVERY_UNIT : MOVE_COURSE_DESIGN_UNIT, { onComplete: () => onComplete(props.isDelivery) });

  return units.length > 0 && <List>
    {unitItems}
    <FrontItemDropArea onDrop={(movableKey, frontKey) => moveCourseDesignUnit({ movableKey, frontKey })} />
  </List>;
}

export default React.memo(Units);
