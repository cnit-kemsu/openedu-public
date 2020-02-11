import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';

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
    this.timeout = setTimeout(() => this.props.onChange(currentTarget, value), this.props.timeout || 1000);
  }

  render() {
    const { onChange, timeout, ...props } = this.props;
    return <TextField {...props} onChange={this.onChange} />;
  }
}


