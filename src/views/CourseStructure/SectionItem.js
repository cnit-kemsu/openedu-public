import React, { memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@components/ExpansionPanel';
import { DragItem, DropItem } from '@components/DragAndDropItems';
import SubsectionsView from './Subsections';
import { SectionItem as useStyles } from './styles';

function SectionItem({ index, section: { id, subsections, ...item }, sectionMenu, createSubsectionDialog, moveSection, dragScope, ...props }) {
  const sectionIndex = index + 1;

  const classes = useStyles({ count: subsections.length });
  return <DragItem index={index} dragData={id} dragElement={<div>{item.name}</div>} scope={dragScope}>
    <DropItem index={index} dropData={id} onDrop={moveSection} scope={dragScope}>
      <Paper className={classes.root}>
        <ExpansionPanel id={'section'+id} scope="course-structure"

          summary={
            <ListItem>
              <ListItemText primary={item.name} secondary={item.summary} />
              <ListItemSecondaryAction>
                <MoreIconButton onClick={event => sectionMenu.open(event, { id, item })} />
              </ListItemSecondaryAction>
            </ListItem>
          }

          details={<>
            <Divider />
            <div className={classes.subsections}>
              <SubsectionsView subsections={subsections} sectionIndex={sectionIndex} {...props} />
            </div>
            <Button size="small" variant="contained" color="primary" className={classes.addSubsectionButton} onClick={() => createSubsectionDialog.open({ sectionId: id, sectionIndex })}>
              <AddIcon className={classes.addIcon} />
              Создать подраздел
            </Button>
          </>}

        />
      </Paper>

    </DropItem>
  </DragItem>;
}

export default React.memo(SectionItem);