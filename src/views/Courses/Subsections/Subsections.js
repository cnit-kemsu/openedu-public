import React from 'react';
import { useElementArray, List } from '@kemsu/core';
import SubsectionItem from './SubsectionItem';

function Subsections({ subsections, menu }) {
  const subsectionItems = useElementArray(SubsectionItem, subsections, { key: subsection => subsection.id, menu });

  return subsections.length > 0 && <List>
    {subsectionItems}
  </List>;
}

export default React.memo(Subsections);
