import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@kemsu/graphql-client';
import { Loader, Link } from '@kemsu/core';
import { Course as useStyles, Section as useSectionStyles, Subsection as useSubsectionStyles } from './styles';

export const COURSE = ({ id = 'Int!' }) => `
  courseRelease(id: ${id}) {
    id
    name
    summary
    startDate
    enrollmentEndDate
    sections {
      id
      name
      summary
      subsections {
        id
        name
        summary
      }
    }
  }
`;

function Subsection({ id, name }) {

  const classes = useSubsectionStyles();
  return <div className={classes.root}>
    <Link styled path={`/subsection/${id}`}>
      <Typography>
        {name}
      </Typography>
    </Link>
  </div>;
}

function renderSubsection(props) {
  return <Subsection key={props.id} {...props} />;
}

function Section({ name, subsections }) {

  const classes = useSectionStyles();
  return <div className={classes.root}>
    <Typography variant="h6">
      {name}
    </Typography>
    <div>
      {subsections.map(renderSubsection)}
    </div>
  </div>;
}

function renderSection(props) {
  return <Section key={props.id} {...props} />;
}

function Course({ courseId }) {
  
  const [{ courseRelease: course }, loading, errors] = useQuery(COURSE, { id: courseId });

  const classes = useStyles();
  return <Paper className={classes.root}>
    <Loader loading={loading} errors={errors}>
      {course && <div>
        <Typography variant="h4">
          {course.name}
        </Typography>
        <div>
          {course.sections.map(renderSection)}
        </div>
      </div>}
    </Loader>
  </Paper>;
}

export default React.memo(Course);