import React, { PureComponent } from 'react';
import Fade from './Fade';
import './HiddenMessage.css';

interface Props {
  initialShow: boolean;
}

interface State {
  show: boolean;
}

export default class HiddenMessage extends PureComponent<Props, State> {
  public static defaultProps = {
    initialShow: true,
  };

  public state = {
    show: this.props.initialShow,
  };

  public render() {
    const { initialShow } = this.props;
    const { show } = this.state;
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <Fade in={show}>
          <div className={initialShow ? 'hidden-message-enter' : 'hidden-message-exit'}>
            Hello world
          </div>
        </Fade>
      </div>
    );
  }

  private toggle = () => this.setState(({ show }) => ({ show: !show }));
}
