import React from 'react';

import { create, act } from 'react-test-renderer';

import { Bravo } from 'components/Bravo';
import { Error as ErrorComponent } from 'components/Error';
import { PlayerCard } from 'components/PlayerCard';

import { controller } from 'helpers/controller';

import { Game } from '../index';

const mockPayload = {
  matchId: 1,
  scoreToWin: 10,
  players: Array
    .from(Array(2))
    .map((_, index) => ({
      name: `Player ${index}`,
      id: index,
      imageUrl: `imageUrl ${index}`,
    })),
};

jest.mock('helpers/controller');

jest.mock('components/Game/helpers', () => ({
  ...jest.requireActual('components/Game/helpers'),
  getRandomInteger: () => mockPayload.scoreToWin,
}));

const setup = () => {
  const testRenderer = create(<Game />);
  const testInstance = testRenderer.root;

  return {
    testRenderer,
    testInstance,
    rootElement: testInstance.children[0],
  };
};

describe('Component: Game', () => {
  it('Should render component', () => {
    const { testInstance, rootElement } = setup();
    const idElement = testInstance.findByProps({ className: 'game__id' });
    const titleElement = testInstance.findByProps({ className: 'game__title' });
    const subtitleElement = testInstance.findByProps({ className: 'game__subtitle' });

    expect(rootElement.children.includes(idElement)).toBe(true);
    expect(rootElement.children.includes(titleElement)).toBe(true);
    expect(rootElement.children.includes(subtitleElement)).toBe(true);
  });

  it('Should render component with data', async () => {
    controller.startGame.mockResolvedValue({
      error: false,
      payload: mockPayload,
    });
    controller.endGame.mockResolvedValue({
      error: false,
      payload: {
        success: true,
      },
    });
    const { testRenderer, testInstance, rootElement } = setup();

    const idElement = testInstance.findByProps({ className: 'game__id' });
    const subtitleElement = testInstance.findByProps({ className: 'game__subtitle' });

    await act(async () => {
      testRenderer.update(<Game />);
    });

    const playerCardList = testInstance.findAllByType(PlayerCard);

    expect(idElement.props.children.includes(mockPayload.matchId)).toBe(true);
    expect(subtitleElement.props.children.includes(mockPayload.scoreToWin)).toBe(true);
    expect(playerCardList.length).toBe(mockPayload.players.length);
    playerCardList.forEach((playerCard, index) => {
      expect(playerCard.props.active).toBe(index === 0);
    });

    playerCardList[0].props.onClick();

    await act(async () => {
      testRenderer.update(<Game />);
    });

    const bravoElement = testInstance.findByType(Bravo);

    expect(rootElement.children.includes(bravoElement)).toBe(true);
  });

  it('Should render error', async () => {
    controller.startGame.mockResolvedValue({ error: true, payload: null });

    const { testRenderer, testInstance, rootElement } = setup();

    await act(async () => {
      testRenderer.update(<Game />);
    });

    const errorElement = testInstance.findByType(ErrorComponent);

    expect(rootElement.children.includes(errorElement)).toBe(true);
  });
});
