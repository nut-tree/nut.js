import { MatchResult } from "./match-result.class";

export class ScaledMatchResult<
  LOCATION_TYPE
> extends MatchResult<LOCATION_TYPE> {
  constructor(
    public readonly confidence: number,
    public readonly scale: number,
    public readonly location: LOCATION_TYPE,
    public readonly error?: Error
  ) {
    super(confidence, location, error);
  }
}
