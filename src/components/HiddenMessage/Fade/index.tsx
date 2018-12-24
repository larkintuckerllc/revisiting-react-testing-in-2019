import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Fade.css';

interface Props {
  children: JSX.Element;
  in: boolean;
}

export default class Fade extends PureComponent<Props> {
  public render() {
    const { children } = this.props;
    const inProp = this.props.in;
    return (
      <CSSTransition classNames="fade" in={inProp} timeout={3000}>
        {children}
      </CSSTransition>
    );
  }
}
