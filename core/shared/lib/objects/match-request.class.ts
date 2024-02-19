import { Image } from "./image.class";

export class MatchRequest<NEEDLE_TYPE, PROVIDER_DATA_TYPE> {
  public constructor(
    public readonly haystack: Image,
    public readonly needle: NEEDLE_TYPE,
    public readonly confidence: number | undefined,
    public readonly providerData?: PROVIDER_DATA_TYPE
  ) {
  }
}

