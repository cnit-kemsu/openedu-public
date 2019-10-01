import React, { useState, useCallback } from 'react';

function preventDefault(event) {
  event.preventDefault();
}

const rootStyle = {
  height: '6px',
  width: '100%',
  padding: '2px',
  backgroundClip: 'content-box'
};

const defaultStyle = {
  ...rootStyle,
  backgroundColor: '#eeeeee'
};

const activeStyle = {
  ...rootStyle,
  backgroundColor: '#3f51b5'
};

function FrontItemDropArea({ frontKey, onDrop }) {

  const [style, setStyle] = useState(defaultStyle);

  const onDragEnter = useCallback(event => {
    event.preventDefault();
    setStyle(activeStyle);
  }, []);
  
  const onDragLeave = useCallback(event => {
    event.preventDefault();
    setStyle(defaultStyle);
  }, []);

  const _onDrop = useCallback(event => {
    onDrop(event.dataTransfer.getData('text/plain') |> Number, frontKey);
    setStyle(defaultStyle);
  }, []);

  return <div style={style}
    onDragEnter={onDragEnter}
    onDragOver={preventDefault}
    onDragLeave={onDragLeave}
    onDrop={_onDrop}
  >
  </div>;
}

export default React.memo(FrontItemDropArea);