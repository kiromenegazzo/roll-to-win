import React from 'react';

import { create } from 'react-test-renderer';

import { Error } from '../index';

const setup = (props) => {
  const testRenderer = create(<Error {...props} />);
  const testInstance = testRenderer.root;

  return {
    testInstance,
    rootElement: testInstance.children[0],
  };
};

describe('Component: Error', () => {
  it('Should render component', () => {
    const { testInstance, rootElement } = setup();
    const titleElement = testInstance.findByType('h2');
    const buttonElement = testInstance.findByType('button');

    expect(rootElement.children.includes(titleElement)).toBe(true);
    expect(rootElement.children.includes(buttonElement)).toBe(true);
  });

  it('Should call onClick', () => {
    const onClick = jest.fn();
    const { testInstance } = setup({ onClick });
    const buttonElement = testInstance.findByType('button');

    buttonElement.props.onClick();

    expect(onClick).toBeCalled();
  });
});
