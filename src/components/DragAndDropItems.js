import React, { useMemo, useCallback, useEffect } from 'react';
import { Publisher } from '@kemsu/publisher';
import { useForceUpdate } from '@kemsu/force-update';
import { DropItem as useStyles } from './styles';

class DragType {
  static current = null;
  static changeEvent = new Publisher();

  static set(value) {
    if (value === DragType.current) return;
    DragType.current = value || null;
    DragType.changeEvent.publish();
  }
}

function onDragEnd() {
  DragType.set(null);
}

function DragItem({ children, movingKey, dragType }) {

  const onDragStart = useCallback(event => {
    DragType.set(dragType);
    event.dataTransfer.setData('text/plain', movingKey);
  }, [movingKey, dragType]);

  return <div draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
    {children}
  </div>;
}
DragItem = React.memo(DragItem);

function preventDefault(event) {
  event.preventDefault();
}

class _DropItem {
  constructor(classes, forceUpdate, onDrop, putBeforeKey) {
    this.classes = classes;
    this.className = classes.default;
    this.forceUpdate = forceUpdate;
    this._onDrop = onDrop;
    this.putBeforeKey = putBeforeKey;

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleDropTypeChangeEvent = this.handleDropTypeChangeEvent.bind(this);
    this.handleSubscriptions = this.handleSubscriptions.bind(this);
  }

  onDragEnter(event) {
    event.preventDefault();
    this.className = this.classes.active;
    this.forceUpdate();
  }

  onDragLeave(event) {
    event.preventDefault();
    this.className = this.classes.default;
    this.forceUpdate();
  }

  onDrop(event) {
    const movingKey = event.dataTransfer.getData('text/plain') |> Number;
    this._onDrop({ movingKey, putBeforeKey: this.putBeforeKey });
  }

  handleDropTypeChangeEvent() {
    this.className = this.classes.default;
    this.forceUpdate();
  }

  handleSubscriptions() {
    const sub = DragType.changeEvent.subscribe(this.handleDropTypeChangeEvent);
    return () => sub.unsubscribe();
  }
}

function DropItem({ putBeforeKey, onDrop, dragType }) {

  const classes = useStyles();
  const forceUpdate = useForceUpdate();
  const dropItem = useMemo(() => new _DropItem(classes, forceUpdate, onDrop, putBeforeKey), []);

  useEffect(dropItem.handleSubscriptions, []);

  return <div className={(DragType.current !== dragType ? classes.nonDisplayed : dropItem.className) + ' ' + classes.common}
    onDragEnter={dropItem.onDragEnter}
    onDragOver={preventDefault}
    onDragLeave={dropItem.onDragLeave}
    onDrop={dropItem.onDrop}
  />;
}
DropItem = React.memo(DropItem);

export {
  DragItem,
  DropItem
};