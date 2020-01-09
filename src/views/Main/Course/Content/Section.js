import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionItem from '@components/ExpansionItem';
import Subsection from './Subsection';

function Section({ name, summary, /*index: sectionIndex,*/ subsections, isCurrentUserEnrolled }) {

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
    header={name}
    content={<>
      <Typography>{summary}</Typography>
      {subsectionItems}
    </>}
  />;
}

export default memo(Section);