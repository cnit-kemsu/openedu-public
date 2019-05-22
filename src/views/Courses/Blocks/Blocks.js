import React from 'react';
import { useElementArray, List } from '@kemsu/core';
import BlockItem from './BlockItem';

function Blocks({ blocks, menu, sectionId, courseId, subsectionId }) {
  const blockItems = useElementArray(BlockItem, blocks, { key: block => block.id, menu, sectionId, courseId, subsectionId });

  return blocks.length > 0 && <List>
    {blockItems}
  </List>;
}

export default React.memo(Blocks);
