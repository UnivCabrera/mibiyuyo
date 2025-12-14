export class SATAccessRequested {
  constructor(
    public readonly userId: string,
    public readonly timestamp: Date
  ) {}
}
