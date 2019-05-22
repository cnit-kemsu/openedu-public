import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import MoreIconButton from '@components/MoreIconButton';
import AddIcon from '@material-ui/icons/Add';
import { SubsectionItem as useStyles } from './styles';

import BlocksView from '../Blocks';

export default function SubsectionItem({ id, name, summary, blocks }, { menu, blocksMenu, createBlockDialog, sectionId, courseId }) {

  const classes = useStyles();
  return <div className={classes.root}>
    <ListItem className={classes.listItem}>
      <ListItemText primary={name} secondary={summary} />
      <ListItemSecondaryAction>
        <MoreIconButton onClick={event => menu.open(event, { id, name, summary })} />
      </ListItemSecondaryAction>
    </ListItem>
    <div className={classes.blocksContainer}>
      <BlocksView blocks={blocks} menu={blocksMenu} subsectionId={id} sectionId={sectionId} courseId={courseId} />
    </div>
    <div className={classes.addBlockButtonContainer}>
      <Button size="small" variant="outlined" color="primary" className={classes.addBlockButton} onClick={() => createBlockDialog.open({ subsectionId: id, subsectionName: name })}>
        <AddIcon />
        Создать блок
      </Button>
    </div>
  </div>;
}