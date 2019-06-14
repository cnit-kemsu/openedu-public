import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import UnitsView from '../Units';
import { SubsectionItem as useStyles } from './styles';

export default function SubsectionItem({ index, id, units, ...item }, { subsectionMenu, createUnitDialog, sectionIndex, ...props }) {

  const classes = useStyles({ count: units.length });
  const subsectionIndex = index + 1 |> sectionIndex + '.' + #;
  const primary = <>
    <span className={classes.index}>{subsectionIndex}</span>. {item.name}
  </>;
  return <div className={classes.root}>
    <ListItem className={classes.listItem}>
      <ListItemText primary={primary} secondary={item.summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => subsectionMenu.open(event, { id, item, sectionIndex })} />
      </ListItemSecondaryAction>
    </ListItem>
    <div className={classes.units}>
      <UnitsView units={units} subsectionIndex={subsectionIndex} {...props} />
    </div>
    <Button size="small" variant="outlined" color="primary" className={classes.addUnitButton} onClick={() => createUnitDialog.open({ subsectionId: id, subsectionIndex })}>
      <AddIcon className={classes.addIcon} />
      Создать блок
    </Button>
  </div>;
}