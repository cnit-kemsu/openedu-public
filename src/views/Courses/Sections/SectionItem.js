import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import { SectionItem as useStyles } from './styles';

import SubsectionsView from '../Subsections';

export default function SectionItem({ id, name, summary, subsections }, { menu, subsectionsMenu, createSubsectionDialog, createBlockDialog, blocksMenu, courseId }) {

  const classes = useStyles();
  return <Paper className={classes.root}>
    <ListItem className={classes.listItem}>
      <ListItemText primary={name} secondary={summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => menu.open(event, { id, name, summary })} />
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    <div className={classes.subsectionsContainer}>
      <SubsectionsView subsections={subsections} menu={subsectionsMenu} {...{ createBlockDialog, blocksMenu }} sectionId={id} courseId={courseId} />
    </div>
    <div className={subsections.length > 0 ? classes.addSubsectionButtonContainer : classes.addSubsectionButtonContainerAlone}>
      <Button size="small" variant="contained" color="primary" className={classes.addSubsectionButton} onClick={() => createSubsectionDialog.open({ sectionId: id, sectionName: name })}>
        <AddIcon />
        Создать подраздел
      </Button>
    </div>
  </Paper>;
}