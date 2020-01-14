import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@kemsu/graphql-client';
import { Loader } from '@kemsu/core';
import Document from './Document';
import FileDocument from './FileDocument';
import Video from './Video';
//import StudentQuiz from './StudentQuiz';
import useStyles from './styles';

export const UNIT_DELIVERY = ({ id = 'Int!' }) => `
  courseDeliveryUnit(id: ${id}) {
    type
    data
  }
`;

function Unit({ id }) {
  const [{ courseDeliveryUnit: unit }, loading, errors] = useQuery(UNIT_DELIVERY, { id });
  const type = unit?.type;
  const data = unit?.data;
  
  const classes = useStyles();
  return <Loader loading={loading} errors={errors}>
    {unit != null && <div className={classes.root}>
    
      {data == null && <Typography>Пусто</Typography>}
      {data != null && <>

        {type === 'DOCUMENT' && <Document data={data} />}
        {type === 'FILE_DOCUMENT' && <FileDocument data={data} />}
        {type === 'VIDEO' && <Video data={data} />}

        {/* {type === 'QUIZ' && <div>
          <StudentQuiz id={id} />
        </div>} */}

      </>}
    
    </div>}
  </Loader>;
}

export default React.memo(Unit);