import { makeStyles } from "@material-ui/core/styles";

export const CourseDeliveryInstanceItem = makeStyles({
  root: {
    width: '320px',
    height: '400px !important'
  },
  summary: {
    height: '100px',
    overflow: 'hidden'
  },
  picture: {
    height: '180px'
  }
});

export const CourseDeliveryInstances = makeStyles({
  root: {
    maxWidth: '1100px',
    margin: 'auto',
    paddingTop: '48px'
  },
  items: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 400px)',
    gridAutoRows: '450px',
    padding: '50px'
  }
});

export const CourseDeliveryInstance = makeStyles({
  root: {
    maxWidth: '1100px',
    margin: 'auto',
    marginTop: '48px',
    padding: '32px 24px'
  },
  tabs: {
    paddingBottom: '32px'
  },
  tab: {
  },
  header: {
    display: 'flex',
    width: '100%',
    paddingBottom: '64px',
    borderBottom: '2px solid grey'
  },
  headerDesc: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  enrollButton: {
    width: '300px'
  },
  headerPic: {
    maxWidth: '350px'
  },
  content: {
    paddingTop: '64px',
    display: 'flex'
  },
  contentContent: {
    flex: '1',
    borderRight: '2px solid lightgrey',
    paddingRight: '12px'
  },
  contentContentContent: {
    padding: '24px'
  },
  info: {
    width: '300px',
    paddingLeft: '12px',
    textAlign: 'center'
  },
  infoHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    paddingBottom: '24px',
    color: '#303f9f'
  },
  dateName: {
    color: '#3f51b5',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  dateValue: {
    fontSize: '20px',
    paddingBottom: '12px'
  }
});

export const Section = makeStyles({
  root: {
    padding: '16px 24px'
  },
  summary: {
    fontSize: '14px'
  },
  header: {
    marginBottom: '12px'
  },
  name: {
    fontWeight: 'bold',
    fontSize: '18px'
  },
  disabled: {
    backgroundColor: 'inherit !important'
  },
  sumDisabled: {
    opacity: '1 !important'
  }
});

export const Subsection = makeStyles({
  root: {
    padding: '6px 24px'
  },
  disabled: {
    backgroundColor: 'inherit !important'
  },
  sumDisabled: {
    opacity: '1 !important'
  },
  nameEnrolled: {
    pointerEvents: 'all !important',
    cursor: 'pointer'
  },
  dates: {
    fontSize: '12px'
  },
  summary: {
    fontSize: '14px'
  }
});

export const SubsectionView = makeStyles({
  root: {
    maxWidth: '1100px',
    margin: 'auto',
    marginTop: '48px',
    padding: '32px 24px'
  },
  tabs: {
  },
  tab: {
  },
  content: {
    padding: '64px',
    width: 'fit-content',
    margin: 'auto'
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '16px'
  }
});