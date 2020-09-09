import { Region } from "./region.class";

export class MatchResult {
  constructor(
    public readonly confidence: number,
    public readonly location: Region,
    public readonly error?: Error
  ) {}
}
