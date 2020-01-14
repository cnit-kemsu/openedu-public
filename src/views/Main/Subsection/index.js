import React, { useMemo } from 'react';
import { useQuery } from '@kemsu/graphql-client';
import { Loader } from '@kemsu/core';
import { Location, useRoute } from '@kemsu/router';
import Header from './Header';
import Unit from './Unit';

export const SUBSECTION_DELIVERY = ({ id = 'Int!' }) => `
  courseDeliverySubsection(id: ${id}) {
    id
    name
    previousSubsectionId
    nextSubsectionId
    units {
      id
      name
      previousUnitId
      nextUnitId
    }
    section {
      name
      course {
        name
        id
      }
    }
  }
`;

function getUnitIndex(units) {
  const unitIndex = Location.search['unit-index'];
  if (!unitIndex) return 0;
  if (unitIndex === -1 && units != null) return units.length - 1;
  return unitIndex;
}

function Subsection({ id }) {
  useRoute();
  const [{ courseDeliverySubsection: subsection }, loading, errors] = useQuery(SUBSECTION_DELIVERY, { id });
  const unitIndex = getUnitIndex(subsection?.units);
  const unitId = loading ? null : subsection?.units[unitIndex]?.id;

  return <div>
    <Loader loading={loading} errors={errors}>
      {subsection != null && <>
        <Header subsection={subsection} unitIndex={unitIndex} />
        {unitId != null && <Unit id={unitId} />}
      </>}
    </Loader>
  </div>;
}

export default React.memo(Subsection);