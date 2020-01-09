import React, { memo } from 'react';
import Section from './Section';

function Content({ sections, isCurrentUserEnrolled }) {
  return <div>
    {sections.map(
      (props, index) =>
        <Section key={props.id}
        //index={index + 1}
        isCurrentUserEnrolled={isCurrentUserEnrolled}
        {...props} />
    )}
  </div>;
}

export default memo(Content);