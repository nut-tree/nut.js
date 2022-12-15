import { Image } from "./image.class";

export class MatchRequest {
  constructor(
    public readonly haystack: Image,
    public readonly needle: Image,
    public readonly confidence: number,
    public readonly searchMultipleScales: boolean = true
  ) {}
}
