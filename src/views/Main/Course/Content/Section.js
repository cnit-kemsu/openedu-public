import React, { memo } from 'react';
import ExpansionItem from '@components/ExpansionItem';
import Subsection from './Subsection';

function Section({ name, summary, /*index: sectionIndex,*/ subsections, isCurrentUserEnrolled }) {

  const totalUnits = subsections.reduce((total, { units }) => total + units.length, 0);
  if (totalUnits === 0) return null;

  const subsectionItems = subsections.map(
    (props, index) =>
      <Subsection
        key={props.id}
        //index={index + 1}
        //sectionIndex={sectionIndex}
        isCurrentUserEnrolled={isCurrentUserEnrolled}
        {...props}
      />
  );

  if (name === '0') return subsectionItems;

  return <ExpansionItem
    title={name}
    summary={summary}
    content={subsectionItems}
  />;
}

export default memo(Section);