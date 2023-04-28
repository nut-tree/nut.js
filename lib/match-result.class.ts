import { Region } from "./region.class";
import {
  isColorMatchRequest,
  isImageMatchRequest,
  isTextMatchRequest,
  MatchRequest,
} from "./match-request.class";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { Point } from "./point.class";
import { PointResultFindInput, RegionResultFindInput } from "./screen.class";

export class MatchResult<LOCATION_TYPE> {
  constructor(
    public readonly confidence: number,
    public readonly location: LOCATION_TYPE,
    public readonly error?: Error
  ) {}
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
