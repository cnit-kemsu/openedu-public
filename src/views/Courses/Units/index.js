import React from 'react';
import { useElementArray, List } from '@kemsu/core';
import UnitItem from './UnitItem';

function Units({ units, ...props }) {
  const unitItems = useElementArray(UnitItem, units, props);

  return units.length > 0 && <List>
    {unitItems}
  </List>;
}

export default React.memo(Units);
