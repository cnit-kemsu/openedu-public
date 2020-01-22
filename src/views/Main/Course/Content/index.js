import React, { memo } from 'react';
import Section from './Section';
import useStyles from './styles';

function Content({ sections, isCurrentUserEnrolled }) {
  const classes = useStyles();
  return <div className={classes.root}>
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