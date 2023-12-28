import Player from "./Player";

export default class Round {
  private _players: Player[];

  constructor(public status: string) {
    this._players = [];
  }

  get players(): Player[] {
    return [...this._players];
  }

  updatePlayers(players: Player[]) {
    this._players = players;
  }
}
