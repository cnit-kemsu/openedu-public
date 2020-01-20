import React, { useCallback } from 'react';
import { Notifications, useElementArray, List } from '@kemsu/core';
import { useMutation, refetch } from '@kemsu/graphql-client';
import { DropItem } from '@components/DragAndDropItems';
import { COURSE_DESIGN_TEMPLATE, COURSE_DELIVERY_INSTANCE } from '../';
import SubsectionItem from './SubsectionItem';

const MOVE_COURSE_DESIGN_SUBSECTION = ({
  movingKey = 'Int!',
  putBeforeKey = 'Int'
}) => `
  moveCourseDesignSubsection(
    movingSubsectionId: ${movingKey}
    putBeforeSubsectionId: ${putBeforeKey}
  )
`;
const MOVE_COURSE_DELIVERY_SUBSECTION = ({
  movingKey = 'Int!',
  putBeforeKey = 'Int'
}) => `
  moveCourseDeliverySubsection(
    movingSubsectionId: ${movingKey}
    putBeforeSubsectionId: ${putBeforeKey}
  )
`;
function onComplete(isDelivery) {
  refetch(isDelivery ? COURSE_DELIVERY_INSTANCE : COURSE_DESIGN_TEMPLATE);
  Notifications.push('Порядок подразделов был успешно изменен.', 'success');
}

function Subsections({ subsections, ...props }) {
  const _moveSubsection = useMutation(props.isDelivery ? MOVE_COURSE_DELIVERY_SUBSECTION : MOVE_COURSE_DESIGN_SUBSECTION, { onComplete: () => onComplete(props.isDelivery) });
  const moveSubsection = useCallback((dragData, dropData) => _moveSubsection({ movingKey: dragData, putBeforeKey: dropData }), []);

  const dragScope = 'subsection' + props.sectionIndex;

  return subsections.length > 0 && <List>
    {subsections?.map((subsection, index) => <SubsectionItem {...{ key: subsection.id, index, subsection, dragScope, moveSubsection, ...props }} />)}
    <DropItem index={subsections?.length} onDrop={moveSubsection} scope={dragScope} />
  </List>;
}

export default React.memo(Subsections);
