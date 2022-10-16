import { MatchResult } from "./match-result.class";
import { Region } from "./region.class";

export class ScaledMatchResult extends MatchResult {
  constructor(
    public readonly confidence: number,
    public readonly scale: number,
    public readonly location: Region,
    public readonly error?: Error
  ) {
    super(confidence, location, error);
  }
}
