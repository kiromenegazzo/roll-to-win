import React from 'react';

import { create } from 'react-test-renderer';

import { PlayerCard } from '../index';

const player = {
  name: 'Name',
  imageUrl: 'imageUrl',
  score: 0,
};

const setup = (props) => {
  const testRenderer = create(<PlayerCard {...player} {...props} />);
  const testInstance = testRenderer.root;

  return {
    testInstance,
    rootElement: testInstance.children[0],
  };
};

describe('Component: PlayerCard', () => {
  it('Should render component', () => {
    const { testInstance, rootElement } = setup();
    const titleElement = testInstance.findByType('h2');
    const imageElement = testInstance.findByType('img');
    const spanElement = testInstance.findByType('span');
    const buttonElement = testInstance.findByType('button');

    expect(rootElement.children.includes(titleElement)).toBe(true);
    expect(rootElement.children.includes(spanElement)).toBe(true);
    expect(rootElement.children.includes(imageElement)).toBe(true);
    expect(rootElement.children.includes(buttonElement)).toBe(true);
  });

  it('Should render name', () => {
    const { testInstance } = setup();
    const titleElement = testInstance.findByType('h2');

    expect(titleElement.props.children).toBe(player.name);
  });

  it('Should render image', () => {
    const { testInstance } = setup();
    const imageElement = testInstance.findByType('img');

    expect(imageElement.props.alt).toBe(player.name);
    expect(imageElement.props.src).toBe(player.imageUrl);
  });

  it('Should render score', () => {
    const { testInstance } = setup();
    const spanElement = testInstance.findByType('span');

    expect(spanElement.props.children.includes(player.score)).toBe(true);
  });

  it('Should render active', () => {
    const { rootElement } = setup({ active: true });

    expect(rootElement.props.className.includes('player--active')).toBe(true);
  });

  it('Should call onClick', () => {
    const onClick = jest.fn();
    const { testInstance } = setup({ onClick });
    const buttonElement = testInstance.findByType('button');

    buttonElement.props.onClick();

    expect(onClick).toBeCalled();
  });

  it('Should render disabled button', () => {
    const { testInstance } = setup({ disabled: true });
    const buttonElement = testInstance.findByType('button');

    expect(buttonElement.props.disabled).toBe(true);
  });
});
