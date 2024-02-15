export class MatchResult<LOCATION_TYPE> {
  constructor(
    public readonly confidence: number,
    public readonly location: LOCATION_TYPE,
    public readonly error?: Error
  ) {
  }
}

