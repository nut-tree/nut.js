import { Image } from "./image.class";
import {
  createMatchRequest,
  isImageMatchRequest,
  isTextMatchRequest,
} from "./match-request.class";
import { mockPartial } from "sneer";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { LogProviderInterface } from "./provider";
import { NoopLogProvider } from "./provider/log/noop-log-provider.class";
import { Region } from "./region.class";
import { TextQuery } from "./query.class";

beforeEach(() => {
  jest.clearAllMocks();
});

const providerRegistryMock = mockPartial<ProviderRegistry>({
  getLogProvider(): LogProviderInterface {
    return new NoopLogProvider();
  },
});

const screenImage = new Image(0, 0, Buffer.of(0), 3, "dummy", 0, 0);
const dummyRegion = new Region(0, 0, 0, 0);

describe("MatchRequest", () => {
  it("should create an image match request for images", () => {
    // GIVEN
    const needle = new Image(0, 0, Buffer.of(0), 3, "dummy", 0, 0);

    // WHEN
    const matchRequest = createMatchRequest(
      providerRegistryMock,
      needle,
      dummyRegion,
      0,
      screenImage
    );

    // THEN
    expect(isImageMatchRequest(matchRequest)).toBeTruthy();
  });

  it.each<TextQuery>([
    {
      id: "dummy",
      type: "text",
      by: {
        word: "dummy-query",
      },
    },
    {
      id: "dummy",
      type: "text",
      by: {
        line: "dummy-query",
      },
    },
  ])(
    "should create a text match request for text queries",
    (needle: TextQuery) => {
      // GIVEN

      // WHEN
      const matchRequest = createMatchRequest(
        providerRegistryMock,
        needle,
        dummyRegion,
        0,
        screenImage
      );

      // THEN
      expect(isTextMatchRequest(matchRequest)).toBeTruthy();
    }
  );
});
