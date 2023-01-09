import { Region } from "./region.class";
import { isImageMatchRequest, MatchRequest } from "./match-request.class";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { Image } from "./image.class";
import { TextQuery } from "./query.class";

export class MatchResult {
  constructor(
    public readonly confidence: number,
    public readonly location: Region,
    public readonly error?: Error
  ) {}
}

export async function getMatchResults<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest: MatchRequest<TextQuery, PROVIDER_DATA_TYPE>
): Promise<MatchResult[]>;
export async function getMatchResults<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest: MatchRequest<Image, PROVIDER_DATA_TYPE>
): Promise<MatchResult[]>;
export async function getMatchResults<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest:
    | MatchRequest<Image, PROVIDER_DATA_TYPE>
    | MatchRequest<TextQuery, PROVIDER_DATA_TYPE>
): Promise<MatchResult[]>;
export async function getMatchResults<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest:
    | MatchRequest<Image, PROVIDER_DATA_TYPE>
    | MatchRequest<TextQuery, PROVIDER_DATA_TYPE>
): Promise<MatchResult[]> {
  return isImageMatchRequest(matchRequest)
    ? providerRegistry.getImageFinder().findMatches(matchRequest)
    : providerRegistry.getTextFinder().findMatches(matchRequest);
}

export async function getMatchResult<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest: MatchRequest<TextQuery, PROVIDER_DATA_TYPE>
): Promise<MatchResult>;
export async function getMatchResult<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest: MatchRequest<Image, PROVIDER_DATA_TYPE>
): Promise<MatchResult>;
export async function getMatchResult<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest:
    | MatchRequest<Image, PROVIDER_DATA_TYPE>
    | MatchRequest<TextQuery, PROVIDER_DATA_TYPE>
): Promise<MatchResult>;
export async function getMatchResult<PROVIDER_DATA_TYPE>(
  providerRegistry: ProviderRegistry,
  matchRequest:
    | MatchRequest<Image, PROVIDER_DATA_TYPE>
    | MatchRequest<TextQuery, PROVIDER_DATA_TYPE>
): Promise<MatchResult> {
  return isImageMatchRequest(matchRequest)
    ? providerRegistry.getImageFinder().findMatch(matchRequest)
    : providerRegistry.getTextFinder().findMatch(matchRequest);
}
