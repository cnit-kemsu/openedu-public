import { makeStyles } from "@material-ui/core/styles";
import Answers from "@views/UnitData/QuizUnit/Questions/Answers";
import { QuestionItem } from "@views/UnitData/QuizUnit/Questions/QuestionItem";

export const Main = makeStyles({
  // myCourses: {
  //   maxWidth: '1100px',
  //   margin: 'auto',
  //   paddingTop: '36px',
  //   paddingBottom: '12px'
  // },
  root: {
  },
  greetingContainer: {
    // height: '350px',
    // display: 'flex',
    // justifyContent: 'center',
    // overflow: 'hidden'
  },
  greetingImg: {
    //height: '100%'
    width: '100%'
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
  header: {
    maxWidth: '1100px',
    margin: 'auto',
    paddingTop: '24px'
  },
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
  },
  navNextBack: {
    display: 'inline-block',
    width: '100%'
  },
  previousSubsectionButton: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '16px',
    float: 'left'
  },
  nextSubsectionButton: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '16px',
    float: 'right'
  }
});

export const Answers1 = makeStyles({
});

export const QuestionItem1 = makeStyles({
  root: {
    minWidth: '800px',
    marginBottom: '32px',
    padding: '32px 24px',
  },
  item: {
    alignItems: 'baseline'
  },
  index: {
    fontWeight: 'bold'
  },
  text: {
    whiteSpace: 'pre-line'
  },
  pre: {
    marginTop: '4px',
    marginRight: '4px'
  }
});

export const AnswerItem1 = makeStyles({
  root: {
    alignItems: 'baseline',
    margin: '4px',
    border: '2px solid #fff0',
  },
  index: {
    fontWeight: 'bold'
  },
  text: {
    whiteSpace: 'pre-line'
  },
  pre: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '-4px',
    marginBottom: '4px'
  }
});

//import { blue } from '@material-ui/core/colors';

export const RightAnswerCheckbox = makeStyles({
  // root: {
  //   color: blue[400]
  // },
  // checked: {
  //   color: blue[600] + ' !important'
  // }
});

export const RightAnswerRadioButton = makeStyles({
  formControlLabel: {
    marginLeft: '0px !important'
  },
  radio: {
  }
});