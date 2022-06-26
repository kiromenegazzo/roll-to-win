import React from 'react';

import { create } from 'react-test-renderer';

import { Bravo } from '../index';

const setup = (props) => {
  const testRenderer = create(<Bravo {...props} />);
  const testInstance = testRenderer.root;

  return {
    testInstance,
    rootElement: testInstance.children[0],
  };
};

describe('Component: Bravo', () => {
  it('Should render component', () => {
    const { testInstance, rootElement } = setup();
    const buttonElement = testInstance.findByType('button');
    const titleElement = testInstance.findByType('h2');
    const subtitleElement = testInstance.findByType('p');

    expect(rootElement.children.includes(titleElement)).toBe(true);
    expect(rootElement.children.includes(subtitleElement)).toBe(true);
    expect(rootElement.children.includes(buttonElement)).toBe(true);
  });

  it('Should render children', () => {
    const children = 'children';
    const { rootElement } = setup({ children });

    expect(rootElement.children.includes(children)).toBe(true);
  });

  it('Should call onClick', () => {
    const onClick = jest.fn();
    const { testInstance } = setup({ onClick });
    const buttonElement = testInstance.findByType('button');

    buttonElement.props.onClick();

    expect(onClick).toBeCalled();
  });
});
