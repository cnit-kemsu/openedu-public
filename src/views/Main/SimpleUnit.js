import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@kemsu/graphql-client';
import { Loader, Link } from '@kemsu/core';
import { Editor } from '@kemsu/editor';
import { SubsectionView as useStyles } from './styles';
import RouteBackBtn from '@components/RouteBackBtn';

export const UNIT_DELIVERY = ({ id = 'Int!' }) => `
  unitDelivery(id: ${id}) {
    id
    name
    type
    data
  }
`;

function SimpleUnit({ id }) {
  
  const [{ unitDelivery }, loading, errors] = useQuery(UNIT_DELIVERY, { id });

  return <Loader loading={loading} errors={errors}>
    {unitDelivery && <div>

      {unitDelivery.type === 'DOCUMENT' && <div>
        <Editor editorState={unitDelivery.data} readOnly={true} />
      </div>}
      {unitDelivery.type === 'VIDEO' && <div>
        <iframe width="704px" height="480px" src={unitDelivery.data.url}
          //sandbox 
          frameBorder="0"
          //allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>}

    </div>}
  </Loader>;
}

export default React.memo(SimpleUnit);