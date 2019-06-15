import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import SubsectionsView from './Subsections';
import { SectionItem as useStyles } from './styles';

export default function SectionItem({ index, id, subsections, ...item }, { sectionMenu, createSubsectionDialog, ...props }) {

  const classes = useStyles({ count: subsections.length });
  const sectionIndex = index + 1;
  const primary = <>
    <span className={classes.index}>{sectionIndex}</span>. {item.name}
  </>;
  return <Paper className={classes.root}>
    <ListItem>
      <ListItemText primary={primary} secondary={item.summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => sectionMenu.open(event, { id, item })} />
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    <div className={classes.subsections}>
      <SubsectionsView subsections={subsections} sectionIndex={sectionIndex} {...props} />
    </div>
    <Button size="small" variant="contained" color="primary" className={classes.addSubsectionButton} onClick={() => createSubsectionDialog.open({ sectionId: id, sectionIndex })}>
      <AddIcon className={classes.addIcon} />
      Создать подраздел
    </Button>
  </Paper>;
}