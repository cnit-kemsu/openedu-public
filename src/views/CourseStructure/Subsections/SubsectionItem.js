import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@components/ExpansionPanel';
import { DragItem, DropItem } from '@components/DragAndDropItems';
import UnitsView from './Units';
import { SubsectionItem as useStyles } from './styles';

function SubsectionItem({ index, subsection: { id, units, ...item }, subsectionMenu, createUnitDialog, sectionIndex, moveSubsection, dragScope, ...props }) {
  const subsectionIndex = index + 1 |> sectionIndex + '.' + #;

  const classes = useStyles({ count: units.length });
  return <div className={classes.root}>

    <DragItem index={index} dragData={id} dragElement={<div>{item.name}</div>} scope={dragScope}>
      <DropItem index={index} dropData={id} onDrop={moveSubsection} scope={dragScope}>
        
        <ExpansionPanel defaultExpanded={true} scope="course-structure"

          summary={
            <ListItem className={classes.listItem}>
              <ListItemText primary={item.name} secondary={item.summary} />
              <ListItemSecondaryAction>
                <MoreIconButton onClick={event => subsectionMenu.open(event, { id, item, sectionIndex })} />
              </ListItemSecondaryAction>
            </ListItem>
          }

          details={<>
            <div className={classes.units}>
              <UnitsView units={units} subsectionIndex={subsectionIndex} {...props} />
            </div>
            <Button size="small" variant="outlined" color="primary" className={classes.addUnitButton} onClick={() => createUnitDialog.open({ subsectionId: id, subsectionIndex })}>
              <AddIcon className={classes.addIcon} />
              Создать блок
            </Button>
          </>}

        />

      </DropItem>
    </DragItem>

  </div>;
}

export default React.memo(SubsectionItem);