import React from 'react';
import TestRenderer from 'react-test-renderer';
import { CSSTransition } from 'react-transition-group';
import HiddenMessage from '../HiddenMessage';

const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: jest.fn(({ children }) => children),
  };
});

it('showing at mount with initialShow true', () => {
  const testRenderer = TestRenderer.create(<HiddenMessage initialShow={true} />);
  const testInstance = testRenderer.root;
  const divInstance = testInstance.findByProps({ children: 'Hello world' });
  expect(divInstance.props.className).toBe('hidden-message-enter');
  const csSTransitionInstance = testInstance.findByType(CSSTransition);
  expect(csSTransitionInstance.props.in).toBe(true);
});

it('hidden at mount with initialShow false', () => {
  const testRenderer = TestRenderer.create(<HiddenMessage initialShow={false} />);
  const testInstance = testRenderer.root;
  const divInstance = testInstance.findByProps({ children: 'Hello world' });
  expect(divInstance.props.className).toBe('hidden-message-exit');
  const csSTransitionInstance = testInstance.findByType(CSSTransition);
  expect(csSTransitionInstance.props.in).toBe(false);
});

it('hidden after button click with initialShow true', async () => {
  const testRenderer = TestRenderer.create(<HiddenMessage initialShow={true} />);
  const testInstance = testRenderer.root;
  const buttonInstance = testInstance.findByType('button');
  buttonInstance.props.onClick();
  await delay(0);
  testInstance.findByProps({ children: 'Hello world' });
  const csSTransitionInstance = testInstance.findByType(CSSTransition);
  expect(csSTransitionInstance.props.in).toBe(false);
});

it('showing after button click with initialShow false', async () => {
  const testRenderer = TestRenderer.create(<HiddenMessage initialShow={false} />);
  const testInstance = testRenderer.root;
  const buttonInstance = testInstance.findByType('button');
  buttonInstance.props.onClick();
  await delay(0);
  testInstance.findByProps({ children: 'Hello world' });
  const csSTransitionInstance = testInstance.findByType(CSSTransition);
  expect(csSTransitionInstance.props.in).toBe(true);
});
