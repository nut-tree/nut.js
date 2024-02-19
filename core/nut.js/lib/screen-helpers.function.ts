import {
  ColorQuery,
  Image,
  isColorQuery,
  isImage,
  isLineQuery,
  isTextQuery,
  MatchRequest,
  MatchResult,
  OptionalSearchParameters,
  Point,
  PointResultFindInput,
  Region,
  RegionResultFindInput,
  TextQuery
} from "@nut-tree/shared";
import { ProviderRegistry } from "@nut-tree/provider-interfaces";

export function isRegionResultFindInput(
  input: RegionResultFindInput | PointResultFindInput
): input is RegionResultFindInput {
  return isImage(input) || isTextQuery(input);
}

export function isPointResultFindInput(
  input: RegionResultFindInput | PointResultFindInput
): input is PointResultFindInput {
  return isColorQuery(input);
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
  minMatch: number | undefined,
  screenImage: Image,
  params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
): MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE>;
export function createMatchRequest<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  needle: RegionResultFindInput,
  searchRegion: Region,
  minMatch: number | undefined,
  screenImage: Image,
  params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
): MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>;
export function createMatchRequest<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  needle: RegionResultFindInput | PointResultFindInput,
  searchRegion: Region,
  minMatch: number | undefined,
  screenImage: Image,
  params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
):
  | MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>
  | MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE>;
export function createMatchRequest<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  needle: RegionResultFindInput | PointResultFindInput,
  searchRegion: Region,
  minMatch: number | undefined,
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
        } in region ${searchRegion.toString()}.${
          minMatch != null ? ` Required confidence: ${minMatch}` : ""
        }`
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
                    } in region ${searchRegion.toString()}.${
        minMatch != null
          ? ` Required confidence: ${minMatch}`
          : ""
      }`
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

export async function getMatchResults<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest: MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>
): Promise<MatchResult<Region>[]>;
export async function getMatchResults<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest: MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE>
): Promise<MatchResult<Point>[]>;
export async function getMatchResults<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest:
    | MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>
    | MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE>
): Promise<MatchResult<Point | Region>[]> {
  if (isImageMatchRequest(matchRequest)) {
    return providerRegistry.getImageFinder().findMatches(matchRequest);
  } else if (isTextMatchRequest(matchRequest)) {
    return providerRegistry.getTextFinder().findMatches(matchRequest);
  } else if (isColorMatchRequest(matchRequest)) {
    return providerRegistry.getColorFinder().findMatches(matchRequest);
  }
  throw new Error(
    `Unknown match request type: ${JSON.stringify(matchRequest.needle)}`
  );
}

export async function getMatchResult<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest: MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>
): Promise<MatchResult<Region>>;
export async function getMatchResult<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest: MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE>
): Promise<MatchResult<Point>>;
export async function getMatchResult<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest:
    | MatchRequest<RegionResultFindInput, PROVIDER_DATA_TYPE>
    | MatchRequest<PointResultFindInput, PROVIDER_DATA_TYPE>
): Promise<MatchResult<Point | Region>> {
  if (isImageMatchRequest(matchRequest)) {
    return providerRegistry.getImageFinder().findMatch(matchRequest);
  } else if (isTextMatchRequest(matchRequest)) {
    return providerRegistry.getTextFinder().findMatch(matchRequest);
  } else if (isColorMatchRequest(matchRequest)) {
    return providerRegistry.getColorFinder().findMatch(matchRequest);
  }
  throw new Error("Unknown match request type");
}
