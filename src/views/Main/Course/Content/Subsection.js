import React, { memo } from 'react';
import { Link } from '@kemsu/core';
import { UserInfo } from '@lib/UserInfo';
import ExpansionItem from '@components/ExpansionItem';
import Unit from './Unit';

function Subsection({ id, name, summary, /*sectionIndex, index: subsectionIndex,*/ isCurrentUserEnrolled, accessDate, units }) {

  const hasAccess = UserInfo.isAdmin || (isCurrentUserEnrolled && new Date() >= new Date(accessDate));

  const unitItems = units.map(
    (props, index) =>
      <Unit
        key={props.id}
        //index={index + 1}
        //sectionIndex={sectionIndex}
        subsectionId={id}
        hasAccess={hasAccess}
        {...props}
      />
  );

  return <ExpansionItem
    title={hasAccess ? <Link styled path={`/delivery-subsection/${id}`}>{name}</Link> : name}
    summary={summary}
    content={unitItems}
  />;
}

export default memo(Subsection);