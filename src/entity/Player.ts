export default class Player {
  constructor(
    readonly name: string,
    public points: number = 0,
    public cards: number = 0
  ) {}
}
