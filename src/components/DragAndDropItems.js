import React, { useMemo, useEffect } from 'react';
import { Publisher } from '@kemsu/publisher';
import { useForceUpdate } from '@kemsu/force-update';
import { DropItem as useDropItemStyles, DragItem as useDragItemStyles } from './styles';

class DragContext {
  static scopeChangeEvent = new Publisher();
  scope = null;
  dragData = null;
  dragElement = null;
  dragIndex = null;
  pending = null;

  static startDragging(dragData, scope, dragElement, dragIndex) {
    DragContext.dragData = dragData;
    DragContext.dragElement = dragElement;
    DragContext.dragIndex = dragIndex;
    if (scope !== DragContext.scope) {
      DragContext.scope = scope || null;
      DragContext.scopeChangeEvent.publish(scope);
    }
  }

  static stopDragging() {
    document.body.removeEventListener('dragover', DragContext.handleMouseMove);
    document.body.removeChild(DragContext.dragElement);
    DragContext.dragData = null;
    DragContext.dragElement = null;
    DragContext.dragIndex = null;
    const oldScope = DragContext.scope;
    DragContext.scope = null;
    DragContext.scopeChangeEvent.publish(oldScope);
  }

  static handleMouseMove(event) {
    DragContext.dragElement.style.left = event.clientX + 24 + 'px';
    DragContext.dragElement.style.top = event.clientY - (DragContext.dragElement.clientHeight / 2) + 'px';
  }
}

class _DragItem {
  constructor(forceUpdate, dragData, scope, dragElement, index) {
    this.forceUpdate = forceUpdate;
    this.dragData = dragData;
    this.dragElement = dragElement;
    this.scope = scope;
    this.dragging = false;
    this.index = index;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragStart(event) {
    const dragElement = document.createElement('div');
    dragElement.innerHTML = this.dragElement;
    dragElement.style.width = 'fit-content';
    dragElement.style.padding = '12px';
    dragElement.style.borderRadius = '2px';
    dragElement.style.position = 'fixed';
    dragElement.style.opacity = '0.7';
    dragElement.style.color = 'white';
    dragElement.style.backgroundColor = 'rgba(63, 81, 181)';
    dragElement.style.border = '1px solid #3f51b5';
    dragElement.style.position = 'fixed';
    document.body.appendChild(dragElement);
    //document.body.insertBefore(dragElement, document.body.firstChild);
    document.body.addEventListener('dragover', DragContext.handleMouseMove);
    event.dataTransfer.setDragImage(new Image(), 0, 0);
    //event.dropEffect = 'move';

    DragContext.startDragging(this.dragData, this.scope, dragElement, this.index);
    
    this.dragging = true;
    this.forceUpdate();
  }

  async onDragEnd() {
    if (DragContext.pending !== null) {
      await DragContext.pending;
      DragContext.pending = null;
    }

    DragContext.stopDragging();

    this.dragging = false;
    this.forceUpdate();
  }
}

function DragItem({ children, dragData, scope, dragElement, index }) {

  const classes = useDragItemStyles();
  const forceUpdate = useForceUpdate();
  const dragItem = useMemo(() => new _DragItem(forceUpdate, dragData, scope, dragElement, index), []);
  dragItem.index = index;

  return <div className={dragItem.dragging ? classes.root_dragging : ''}
    draggable={true}
    onDragStart={dragItem.onDragStart}
    onDragEnd={dragItem.onDragEnd}
  >
    {children}
  </div>;
}
DragItem = React.memo(DragItem);

function preventDefault(event) {
  event.preventDefault();
}

class _DropItem {
  constructor(forceUpdate, dropData, onDrop, scope) {
    this.forceUpdate = forceUpdate;
    this.dropData = dropData;
    this.__onDrop = onDrop;
    this.scope = scope;
    this.isDragOver = false;

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleScopeChangeEvent = this.handleScopeChangeEvent.bind(this);
    this.handleSubscriptions = this.handleSubscriptions.bind(this);
  }

  onDragEnter(event) {
    event.preventDefault();
    this.isDragOver = true;
    this.forceUpdate();
  }

  onDragLeave(event) {
    event.preventDefault();
    this.isDragOver = false;
    this.forceUpdate();
  }

  async _onDrop(resolve) {
    try {
      await this.__onDrop(DragContext.dragData, this.dropData);
    } finally {
      this.isDragOver = false;
      resolve();
    }
  }

  onDrop(event) {
    event.preventDefault();
    DragContext.pending = new Promise(this._onDrop);
  }

  handleScopeChangeEvent(scope) {
    if (this.scope === scope) this.forceUpdate();
  }

  handleSubscriptions() {
    const sub = DragContext.scopeChangeEvent.subscribe(this.handleScopeChangeEvent);
    return () => sub.unsubscribe();
  }
}

function DropItem({ dropData, onDrop, scope, children, index }) {

  const classes = useDropItemStyles(DragContext.dragElement || {});
  const forceUpdate = useForceUpdate();
  const dropItem = useMemo(() => new _DropItem(forceUpdate, dropData, onDrop, scope), []);

  useEffect(dropItem.handleSubscriptions, []);
  const root_ClassName = classes.root + ' ' + (dropItem.isDragOver ? classes.root_dragOver : '');
  const dropArea_ClassName = classes.dropArea + ' ' + (dropItem.isDragOver ? classes.dropArea_dragOver : '');

  return <div className={root_ClassName}>
    {children}
    {DragContext.scope === scope && DragContext.dragIndex !== index && DragContext.dragIndex + 1 !== index &&
      <div className={dropArea_ClassName}
        onDragEnter={dropItem.onDragEnter}
        onDragOver={preventDefault}
        onDragLeave={dropItem.onDragLeave}
        onDrop={dropItem.onDrop}
      />
    }
  </div>;
}
DropItem = React.memo(DropItem);

export {
  DragItem,
  DropItem
};