import React from 'react';
import { useElementArray, List } from '@kemsu/core';
import BlockItem from './BlockItem';

function Blocks({ blocks, ...props }) {
  const blockItems = useElementArray(BlockItem, blocks, props);

  return blocks.length > 0 && <List>
    {blockItems}
  </List>;
}

export default React.memo(Blocks);
