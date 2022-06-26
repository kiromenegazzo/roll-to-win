import React, { useEffect, useState } from 'react';

import { Bravo } from 'components/Bravo';
import { Error } from 'components/Error';
import { PlayerCard } from 'components/PlayerCard';

import { controller } from 'helpers/controller';

import { initData, mapStartResponse, getRandomInteger } from './helpers';

export const Game = () => {
  const [{ players, scoreToWin, matchId }, setData] = useState(initData);
  const [error, setError] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [end, setEnd] = useState(false);

  const startGame = async () => {
    const response = await controller.startGame();

    const { data: mapData, error: mapError } = mapStartResponse(response);
    const { currentId: mapCurrentId, ...restMapData } = mapData;

    setData(restMapData);
    setError(mapError);
    setCurrentId(mapCurrentId);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleRoll = async () => {
    const randomInteger = getRandomInteger();
    const currentPlayerIndex = players.findIndex((player) => player.entity.id === currentId);
    const { entity, score } = players[currentPlayerIndex];
    const playerId = entity.id;
    const newScore = score + randomInteger;

    if (newScore >= scoreToWin) {
      const { payload, error: responseError } = await controller.endGame({ gameId: matchId, winnerId: playerId });

      setError(responseError);
      setEnd(payload.success);
    } else {
      const nextPlayer = players[currentPlayerIndex === players.length - 1 ? 0 : currentPlayerIndex + 1];

      setCurrentId(nextPlayer?.entity?.id);
    }

    setData((prev) => ({
      ...prev,
      players: prev.players.map((player, index) => (
        index === currentPlayerIndex ? { ...player, score: newScore } : player
      )),
    }));
  };

  const handleReplay = async () => {
    setEnd(false);
    await startGame();
  };

  const renderBravo = () => {
    const { entity, score } = players.find((player) => player.entity.id === currentId);

    return (
      <Bravo onClick={handleReplay}>
        <PlayerCard disabled {...entity} score={score} />
      </Bravo>
    );
  };

  return (
    <div className="game">
      {!error ? (
        <>
          <p className="game__id">
            Match ID:
            {' '}
            {matchId}
          </p>
          <h1 className="game__title">Roll to win</h1>
          <p className="game__subtitle">
            Score to win:
            {' '}
            {scoreToWin}
          </p>
          {!end ? (
            <div className="game__list">
              {players.map(({ entity, score }) => (
                <PlayerCard
                  {...entity}
                  active={entity.id === currentId}
                  disabled={entity.id !== currentId}
                  key={entity.id}
                  score={score}
                  onClick={handleRoll}
                />
              ))}
            </div>
          ) : renderBravo()}
        </>
      ) : <Error onClick={startGame} />}
    </div>
  );
};
