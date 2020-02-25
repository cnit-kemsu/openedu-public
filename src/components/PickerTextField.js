import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

export default class PickerTextField extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    const currentTarget = event.currentTarget;
    const value = currentTarget.value;
    if (this.timeout) clearTimeout(this.timeout);
    this.val = value;
    this.timeout = setTimeout(() => this.props.onChange(currentTarget, value), this.props.timeout || 1000);
  }

  render() {
    const { onChange, timeout, onClick, style, showButton, ...props } = this.props;
    return <div style={style}>
      <TextField {...props} style={{ width: '85%' }} onChange={this.onChange} />
      {showButton && <Button style={{ width: '15%' }} onClick={() => onClick(this.val)}>Добавить</Button>}
    </div>;
  }
}


