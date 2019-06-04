import React from 'react';
import { useElementArray, List } from '@kemsu/core';
import SubsectionItem from './SubsectionItem';

function Subsections({ subsections, ...props }) {
  const subsectionItems = useElementArray(SubsectionItem, subsections, props);

  return subsections.length > 0 && <List>
    {subsectionItems}
  </List>;
}

export default React.memo(Subsections);
