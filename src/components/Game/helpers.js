export const initData = {
  players: [],
  matchId: null,
  scoreToWin: null,
  currentId: null,
};

export const mapStartResponse = (response) => {
  const { payload, error } = response;

  if (!error) {
    const { players, ...rest } = payload;

    return {
      error,
      data: {
        ...rest,
        players: players.map((player) => ({ entity: player, score: 0 })),
        currentId: players[0]?.id,
      },
    };
  }

  return {
    error: true,
    data: initData,
  };
};

export const getRandomInteger = (min = 1, max = 6) => Math.floor(Math.random() * (max - min + 1)) + min;
