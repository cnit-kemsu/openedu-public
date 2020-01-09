import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@kemsu/core';
import { UserInfo } from '@lib/UserInfo';
import ExpansionItem from '@components/ExpansionItem';

function Subsection({ id, name, summary, /*sectionIndex, index: subsectionIndex,*/ isCurrentUserEnrolled, accessDate }) {

  const hasAccess = UserInfo.isAdmin || (isCurrentUserEnrolled && new Date() >= new Date(accessDate));

  return <ExpansionItem
    header={hasAccess ? <Link styled path={`/delivery-subsection/${id}`}>{name}</Link> : name}
    content={<>
      <Typography>{summary}</Typography>
    </>}
  />;
}

export default memo(Subsection);