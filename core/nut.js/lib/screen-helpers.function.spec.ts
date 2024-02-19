import { Image, Region, TextQuery } from "@nut-tree/shared";
import {
  createMatchRequest,
  getMatchResult,
  getMatchResults,
  isImageMatchRequest,
  isTextMatchRequest
} from "./screen-helpers.function";
import { mockPartial } from "sneer";
import {
  ImageFinderInterface,
  LogProviderInterface,
  ProviderRegistry,
  TextFinderInterface
} from "@nut-tree/provider-interfaces";
import { NoopLogProvider } from "./provider/log/noop-log-provider.class";

beforeEach(() => {
  jest.clearAllMocks();
});

const imageFinderMock: ImageFinderInterface = {
  findMatch: jest.fn(),
  findMatches: jest.fn()
};
const textFinderMock: TextFinderInterface = {
  findMatch: jest.fn(),
  findMatches: jest.fn()
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
  }
});

const screenImage = new Image(0, 0, Buffer.of(0), 3, "dummy", 0, 0);
const dummyRegion = new Region(0, 0, 0, 0);

describe("screen helpers", () => {
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
          word: "dummy-query"
        }
      },
      {
        id: "dummy",
        type: "text",
        by: {
          line: "dummy-query"
        }
      }
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

  const dummyImage = new Image(0, 0, Buffer.of(0), 3, "dummy-needle", 0, 0);

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
        expect(imageFinderMock.findMatch).toHaveBeenCalledTimes(1);
      });

      it.each<TextQuery>([
        {
          id: "dummy",
          type: "text",
          by: {
            word: "dummy-query"
          }
        },
        {
          id: "dummy",
          type: "text",
          by: {
            line: "dummy-query"
          }
        }
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
          expect(textFinderMock.findMatch).toHaveBeenCalledTimes(1);
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
        expect(imageFinderMock.findMatches).toHaveBeenCalledTimes(1);
      });

      it.each<TextQuery>([
        {
          id: "dummy",
          type: "text",
          by: {
            word: "dummy-query"
          }
        },
        {
          id: "dummy",
          type: "text",
          by: {
            line: "dummy-query"
          }
        }
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
          expect(textFinderMock.findMatches).toHaveBeenCalledTimes(1);
        }
      );
    });
  });
});