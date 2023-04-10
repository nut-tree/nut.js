import { Image, isImage } from "./image.class";
import { Region } from "./region.class";
import { OptionalSearchParameters } from "./optionalsearchparameters.class";
import {
  ColorQuery,
  isColorQuery,
  isLineQuery,
  isTextQuery,
  TextQuery,
} from "./query.class";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { PointResultFindInput, RegionResultFindInput } from "./screen.class";

export class MatchRequest<NEEDLE_TYPE, PROVIDER_DATA_TYPE> {
  public constructor(
    public readonly haystack: Image,
    public readonly needle: NEEDLE_TYPE,
    public readonly confidence: number,
    public readonly providerData?: PROVIDER_DATA_TYPE
  ) {}
}

export function isImageMatchRequest<PROVIDER_DATA_TYPE>(
  matchRequest: any
): matchRequest is MatchRequest<Image, PROVIDER_DATA_TYPE> {
  return isImage(matchRequest.needle);
}

export function isTextMatchRequest<PROVIDER_DATA_TYPE>(
  matchRequest: any
): matchRequest is MatchRequest<TextQuery, PROVIDER_DATA_TYPE> {
  return isTextQuery(matchRequest.needle);
}

export function isColorMatchRequest<PROVIDER_DATA_TYPE>(
  matchRequest: any
): matchRequest is MatchRequest<ColorQuery, PROVIDER_DATA_TYPE> {
  return isColorQuery(matchRequest.needle);
}

export function createMatchRequest<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  needle: PointResultFindInput,
  searchRegion: Region,
  minMatch: number,
  screenImage: Image,
  params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
): MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE>;
export function createMatchRequest<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  needle: RegionResultFindInput,
  searchRegion: Region,
  minMatch: number,
  screenImage: Image,
  params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
): MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>;
export function createMatchRequest<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  needle: RegionResultFindInput | PointResultFindInput,
  searchRegion: Region,
  minMatch: number,
  screenImage: Image,
  params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
):
  | MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>
  | MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE>;
export function createMatchRequest<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  needle: RegionResultFindInput | PointResultFindInput,
  searchRegion: Region,
  minMatch: number,
  screenImage: Image,
  params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
):
  | MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>
  | MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE> {
  if (isImage(needle)) {
    providerRegistry
      .getLogProvider()
      .info(
        `Searching for image ${
          needle.id
        } in region ${searchRegion.toString()}. Required confidence: ${minMatch}`
      );

    return new MatchRequest(
      screenImage,
      needle,
      minMatch,
      params?.providerData
    );
  } else if (isTextQuery(needle)) {
    providerRegistry.getLogProvider().info(
      `Searching for ${isLineQuery(needle) ? "line" : "word"} {
                        ${isLineQuery(needle) ? needle.by.line : needle.by.word}
                    } in region ${searchRegion.toString()}. Required confidence: ${minMatch}`
    );

    return new MatchRequest(
      screenImage,
      needle,
      minMatch,
      params?.providerData
    );
  } else if (isColorQuery(needle)) {
    const color = needle.by.color;
    providerRegistry
      .getLogProvider()
      .info(
        `Searching for color RGBA(${color.R},${color.G},${color.B},${
          color.A
        }) in region ${searchRegion.toString()}.`
      );

    return new MatchRequest(screenImage, needle, 1, params?.providerData);
  }
  throw new Error(`Unknown input type: ${JSON.stringify(needle)}`);
}
