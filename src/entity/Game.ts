import Player from './Player';
import Round from './Round';

type StatusGame = 'idle' | 'progress' | 'finished';

export default class Game {
  private _players: Player[] = [];
  rounds: Round[] = [];
  status: StatusGame = 'idle';
  private forgottenPlayerName: string = '';

  get playersOrderByPoints(): Player[] {
    return this._players.sort(this.sortByGreaterThan('points'));
  }

  get playersOrderByCards(): Player[] {
    return [...this._players.sort(this.sortByGreaterThan('cards'))];
  }

  get winnerPlayer(): Player {
    return this.playersOrderByPoints[0];
  }

  private sortByGreaterThan(prop: keyof Player) {
    return function (a: Player, b: Player) {
      if (a[prop] < b[prop]) return 1;
      if (a[prop] > b[prop]) return -1;
      return 0;
    };
  }

  hasNotPlayersEnough(): boolean {
    return this._players.length < 2;
  }

  hasLimitPlayers(): boolean {
    return this._players.length === 6;
  }

  cardToDistribute(): number {
    return this._players.length === 6 ? 5 : 6;
  }

  currentRound(): number {
    return this.rounds.length;
  }

  isFinished(): boolean {
    return this.status === 'finished';
  }
  isIdle(): boolean {
    return this.status === 'idle';
  }

  reset(): void {
    this._players = [];
    this.rounds = [];
    this.status = 'idle';
  }

  addPlayer(name: string) {
    if (!name || this.status === 'progress' || this.hasLimitPlayers()) return;
    this._players.push(new Player(name));
  }

  private notAllowedToChangeGameInfo(): boolean {
    return this.hasNotPlayersEnough() || this.isFinished();
  }
  startRound() {
    if (this.notAllowedToChangeGameInfo()) return;

    this.status = 'progress';
    this.rounds.push(new Round('started'));
  }

  defineForgottenPlayer = (playerName: string): void => {
    this.forgottenPlayerName = playerName;
  };

  finishRound() {
    if (this.notAllowedToChangeGameInfo()) return;

    const points: number[] = [];

    this._players.forEach((player) => {
      points.push(player.cards);
    });

    points.sort((a, b) => (a < b ? 1 : -1));
    const hashMapPoints: { [key: string]: number } = points.reduce(
      (prev, curr, currIdx) => ({ ...prev, [curr]: currIdx + 1 }),
      {}
    );

    const playersRound: Player[] = [];

    this._players.forEach((player) => {
      player.points += hashMapPoints[player.cards];
      if (player.name === this.forgottenPlayerName) {
        player.points -= 1;
        this.forgottenPlayerName = '';
      }
      playersRound.push(Object.assign({}, player));
      player.cards = 0;
    });

    this.rounds[this.rounds.length - 1].updatePlayers(playersRound);

    if (this.currentRound() === 3) this.status = 'finished';
  }
}
