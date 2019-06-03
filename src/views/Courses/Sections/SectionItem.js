import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import SubsectionsView from '../Subsections';
import { SectionItem as useStyles } from './styles';

export default function SectionItem({ id, name, summary, subsections }, { sectionMenu, createSubsectionDialog, ...props }) {

  const classes = useStyles({ count: subsections.length });
  return <Paper className={classes.root}>
    <ListItem>
      <ListItemText primary={name} secondary={summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => sectionMenu.open(event, { id, name, summary })} />
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    <div className={classes.subsections}>
      <SubsectionsView subsections={subsections} sectionId={id} {...props} />
    </div>
    <Button size="small" variant="contained" color="primary" className={classes.addSubsectionButton} onClick={() => createSubsectionDialog.open({ sectionId: id, sectionName: name })}>
      <AddIcon />
      Создать подраздел
    </Button>
  </Paper>;
}