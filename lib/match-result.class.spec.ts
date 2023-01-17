import { createMatchRequest } from "./match-request.class";
import { Image } from "./image.class";
import { Region } from "./region.class";
import { mockPartial } from "sneer";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { ImageFinderInterface, LogProviderInterface } from "./provider";
import { NoopLogProvider } from "./provider/log/noop-log-provider.class";
import { TextFinderInterface } from "./provider/text-finder.interface";
import { getMatchResult, getMatchResults } from "./match-result.class";
import { TextQuery } from "./query.class";

const dummyImage = new Image(0, 0, Buffer.of(0), 3, "dummy-needle", 0, 0);
const screenImage = new Image(
  0,
  0,
  Buffer.of(0),
  3,
  "dummy-screen-image",
  0,
  0
);
const dummyRegion = new Region(0, 0, 0, 0);

beforeEach(() => {
  jest.clearAllMocks();
});

const imageFinderMock: ImageFinderInterface = {
  findMatch: jest.fn(),
  findMatches: jest.fn(),
};
const textFinderMock: TextFinderInterface = {
  findMatch: jest.fn(),
  findMatches: jest.fn(),
};

const providerRegistryMock = mockPartial<ProviderRegistry>({
  getLogProvider(): LogProviderInterface {
    return new NoopLogProvider();
  },
  getImageFinder(): ImageFinderInterface {
    return imageFinderMock as unknown as ImageFinderInterface;
  },
  getTextFinder(): TextFinderInterface {
    return textFinderMock as unknown as TextFinderInterface;
  },
});

describe("matchResults", () => {
  describe("getMatchResult", () => {
    it("should call the correct finder implementation for a given image match request", async () => {
      // GIVEN
      const imageMatchRequest = createMatchRequest(
        providerRegistryMock,
        dummyImage,
        dummyRegion,
        0,
        screenImage
      );

      // WHEN
      await getMatchResult(providerRegistryMock, imageMatchRequest);

      // THEN
      expect(imageFinderMock.findMatch).toBeCalledTimes(1);
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
      "should all the correct finder implementation for a given text query",
      async (needle: TextQuery) => {
        // GIVEN
        const matchRequest = createMatchRequest(
          providerRegistryMock,
          needle,
          dummyRegion,
          0,
          screenImage
        );

        // WHEN
        await getMatchResult(providerRegistryMock, matchRequest);

        // THEN
        expect(textFinderMock.findMatch).toBeCalledTimes(1);
      }
    );
  });

  describe("getMatchResults", () => {
    it("should call the correct finder implementation for a given image match request", async () => {
      // GIVEN
      const imageMatchRequest = createMatchRequest(
        providerRegistryMock,
        dummyImage,
        dummyRegion,
        0,
        screenImage
      );

      // WHEN
      await getMatchResults(providerRegistryMock, imageMatchRequest);

      // THEN
      expect(imageFinderMock.findMatches).toBeCalledTimes(1);
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
      "should all the correct finder implementation for a given text query",
      async (needle: TextQuery) => {
        // GIVEN
        const matchRequest = createMatchRequest(
          providerRegistryMock,
          needle,
          dummyRegion,
          0,
          screenImage
        );

        // WHEN
        await getMatchResults(providerRegistryMock, matchRequest);

        // THEN
        expect(textFinderMock.findMatches).toBeCalledTimes(1);
      }
    );
  });
});
