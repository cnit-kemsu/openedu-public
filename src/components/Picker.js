import React, { PureComponent } from 'react';
import Popper from '@material-ui/core/Popper';

export class Picker extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      target: null,
      open: false
    };
    this.popper = React.createRef(); 
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  open(target) {
    if (!this.state.open) {
      this.setState({
        target,
        open: true
      });
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }
  
  close() {
    this.onClose();
    this.setState({ target: null, open: false });
  }

  componentWillUnmount() {
    if (this.state.open) this.onClose();
  }

  onClose() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.popper.current.contains(event.target)) this.close();
  }
 
  render() {
    return <Popper ref={this.popper}
      open={this.state.open}
      anchorEl={this.state.target}
    >
      {this.props.children}
    </Popper>;
  }
}
