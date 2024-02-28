import Game from '../src/entity/Game';

test('should start a game with A and B player and A should win with 6 point', async () => {
  const game = new Game();

  game.addPlayer('A');
  game.addPlayer('B');
  expect(game.rounds.length).toBe(0);

  game.startRound();

  expect(game.rounds.length).toBe(1);
  game.playersOrderByCards[0].cards = 2;
  game.playersOrderByCards[1].cards = 10;
  game.finishRound();

  game.startRound();
  expect(game.rounds.length).toBe(2);
  game.playersOrderByCards[0].cards = 1;
  game.playersOrderByCards[1].cards = 16;
  game.finishRound();

  game.startRound();
  expect(game.rounds.length).toBe(3);
  game.playersOrderByCards[0].cards = 1;
  game.playersOrderByCards[1].cards = 20;
  game.finishRound();

  expect(game.playersOrderByPoints[0].name).toBe('A');
  expect(game.playersOrderByPoints[0].points).toBe(6);
});

test('should have a draw between A and B player with 5 points', () => {
  const game = new Game();
  game.addPlayer('A');
  game.addPlayer('B');

  game.startRound();
  game.playersOrderByCards[0].cards = 10;
  game.playersOrderByCards[1].cards = 1;
  game.finishRound();

  game.startRound();
  game.playersOrderByCards[0].cards = 1;
  game.playersOrderByCards[1].cards = 10;
  game.finishRound();

  game.startRound();
  game.playersOrderByCards[0].cards = 5;
  game.playersOrderByCards[1].cards = 5;
  game.finishRound();

  expect(game.playersOrderByPoints[0].points).toBe(5);
  expect(game.playersOrderByPoints[1].points).toBe(5);
});

test('should not be able to start a round with only one player', () => {
  const game = new Game();

  game.addPlayer('A');
  game.startRound();

  expect(game.rounds.length).toBe(0);
});

test('should not be able to add more player after the first round', () => {
  const game = new Game();
  game.addPlayer('A');
  game.addPlayer('B');

  game.startRound();

  game.addPlayer('C');

  expect(game.playersOrderByCards.length).toBe(2);
});

test('should be returned 5 cards to distribute when has 6 players', () => {
  const game = new Game();
  game.addPlayer('A');
  game.addPlayer('B');
  game.addPlayer('C');
  game.addPlayer('D');
  game.addPlayer('E');
  game.addPlayer('F');

  expect(game.cardToDistribute()).toBe(5);
});

test('should be returned 6 cards to distribute when has less than 6 players', () => {
  const game = new Game();
  game.addPlayer('A');
  game.addPlayer('B');
  game.addPlayer('C');
  game.addPlayer('D');
  game.addPlayer('E');

  expect(game.cardToDistribute()).toBe(6);
});

test('should not be able to register more than 6 players', () => {
  const game = new Game();
  game.addPlayer('A');
  game.addPlayer('B');
  game.addPlayer('C');
  game.addPlayer('D');
  game.addPlayer('E');
  game.addPlayer('F');
  game.addPlayer('G');

  expect(game.playersOrderByPoints.length).toBe(6);
});

test('should sort the players by cards during the addition cards quantity', async () => {
  const game = new Game();

  game.addPlayer('A');
  game.addPlayer('B');
  expect(game.rounds.length).toBe(0);

  game.startRound();

  expect(game.playersOrderByCards[0].name).toBe('A');
  expect(game.playersOrderByCards[1].name).toBe('B');

  game.playersOrderByCards[0].cards = 2;
  expect(game.playersOrderByCards[0].name).toBe('A');

  game.playersOrderByCards[1].cards = 10;
  expect(game.playersOrderByCards[0].name).toBe('B');

  game.finishRound();
});

test('should return the end of the game and the information about the winner', async () => {
  const game = new Game();

  game.addPlayer('A');
  game.addPlayer('B');
  expect(game.rounds.length).toBe(0);

  game.startRound();
  expect(game.rounds.length).toBe(1);
  expect(game.playersOrderByCards[0].name).toBe('A');
  game.playersOrderByCards[0].cards = 2;
  game.playersOrderByCards[1].cards = 10;
  game.finishRound();

  game.startRound();
  expect(game.rounds.length).toBe(2);
  expect(game.playersOrderByCards[0].name).toBe('A');
  game.playersOrderByCards[0].cards = 1;
  game.playersOrderByCards[1].cards = 16;
  game.finishRound();

  game.startRound();
  expect(game.rounds.length).toBe(3);
  expect(game.playersOrderByCards[0].name).toBe('A');
  game.playersOrderByCards[0].cards = 1;
  game.playersOrderByCards[1].cards = 20;
  game.finishRound();

  expect(game.isFinished()).toBeTruthy();
  expect(game.winnerPlayer.name).toBe('A');
  expect(game.winnerPlayer.points).toBe(6);
});

test('should be able to reset the game', () => {
  const game = new Game();

  game.addPlayer('A');
  game.addPlayer('B');
  game.startRound();

  expect(game.rounds.length).toBe(1);
  expect(game.playersOrderByCards.length).toBe(2);
  expect(game.status).toBe('progress');

  game.reset();

  expect(game.rounds.length).toBe(0);
  expect(game.playersOrderByCards.length).toBe(0);
  expect(game.status).toBe('idle');
});

test('should return the correct points for forgotten player', async () => {
  const game = new Game();

  game.addPlayer('A');
  game.addPlayer('B');
  expect(game.rounds.length).toBe(0);

  game.startRound();
  expect(game.rounds.length).toBe(1);
  expect(game.playersOrderByCards[0].name).toBe('A');
  game.playersOrderByCards[0].cards = 2;
  game.playersOrderByCards[1].cards = 10;
  game.finishRound();

  game.startRound();
  expect(game.rounds.length).toBe(2);
  expect(game.playersOrderByCards[0].name).toBe('A');
  game.playersOrderByCards[0].cards = 1;
  game.defineForgottenPlayer(game.playersOrderByCards[0].name);
  game.playersOrderByCards[1].cards = 16;
  game.finishRound();

  expect(game.playersOrderByPoints[0].name).toBe('A');
  expect(game.playersOrderByPoints[0].points).toBe(3);
});
