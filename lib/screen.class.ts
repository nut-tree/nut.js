import { cwd } from "process";
import { FileType } from "./file-type.enum";
import { generateOutputPath } from "./generate-output-path.function";
import { createMatchRequest, MatchRequest } from "./match-request.class";
import {
  getMatchResult,
  getMatchResults,
  MatchResult,
} from "./match-result.class";
import { isRegion, Region } from "./region.class";
import { timeout } from "./util/timeout.function";
import { Image, isImage } from "./image.class";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { isPoint, Point } from "./point.class";
import { OptionalSearchParameters } from "./optionalsearchparameters.class";
import {
  ColorQuery,
  isColorQuery,
  isTextQuery,
  isWindowQuery,
  LineQuery,
  WindowQuery,
  WordQuery,
} from "./query.class";
import { Window } from "./window.class";

export type WindowCallback = (target: Window) => void | Promise<void>;
export type MatchResultCallback<TARGET_TYPE> = (
  target: MatchResult<TARGET_TYPE>
) => void | Promise<void>;
export type FindHookCallback =
  | WindowCallback
  | MatchResultCallback<Point>
  | MatchResultCallback<Region>;

function validateSearchRegion(
  search: Region,
  screen: Region,
  providerRegistry: ProviderRegistry
) {
  providerRegistry
    .getLogProvider()
    .debug(`Validating search region: ${search}`);
  if (
    search.left < 0 ||
    search.top < 0 ||
    search.width < 0 ||
    search.height < 0
  ) {
    const e = new Error(`Negative values in search region`);
    providerRegistry.getLogProvider().error(e, { region: search });
    throw e;
  }
  if (
    isNaN(search.left) ||
    isNaN(search.top) ||
    isNaN(search.width) ||
    isNaN(search.height)
  ) {
    const e = new Error(`NaN values in search region`);
    providerRegistry.getLogProvider().error(e, { region: search });
    throw e;
  }
  if (search.width < 2 || search.height < 2) {
    const e = new Error(
      `Search region is not large enough. Must be at least two pixels in both width and height.`
    );
    providerRegistry.getLogProvider().error(e, { region: search });
    throw e;
  }
  if (
    search.left + search.width > screen.width ||
    search.top + search.height > screen.height
  ) {
    const e = new Error(
      `Search region extends beyond screen boundaries (${screen.width}x${screen.height})`
    );
    providerRegistry.getLogProvider().error(e, { region: search, screen });
    throw e;
  }
}

/**
 * Config object for {@link ScreenClass} class
 */
export interface ScreenConfig {
  /**
   * Configures the required matching percentage for template images to be declared as a match
   */
  confidence: number;

  /**
   * Configure whether to auto highlight all search results or not
   */
  autoHighlight: boolean;
  /**
   * Configure highlighting duration
   */
  highlightDurationMs: number;

  /**
   * Configure opacity of highlight window
   */
  highlightOpacity: number;

  /**
   * Configures the path from which template images are loaded from
   */
  resourceDirectory: string;
}

export type RegionResultFindInput = Image | WordQuery | LineQuery;
export type PointResultFindInput = ColorQuery;
export type WindowResultFindInput = WindowQuery;
export type FindInput =
  | RegionResultFindInput
  | WindowResultFindInput
  | PointResultFindInput;
export type FindResult = Region | Point | Window;

function isRegionResultFindInput(
  input: RegionResultFindInput | PointResultFindInput
): input is RegionResultFindInput {
  return isImage(input) || isTextQuery(input);
}

function isPointResultFindInput(
  input: RegionResultFindInput | PointResultFindInput
): input is PointResultFindInput {
  return isColorQuery(input);
}

/**
 * {@link ScreenClass} class provides methods to access screen content of a systems main display
 */
export class ScreenClass {
  public config: ScreenConfig = {
    confidence: 0.99,
    autoHighlight: false,
    highlightDurationMs: 500,
    highlightOpacity: 0.25,
    resourceDirectory: cwd(),
  };

  /**
   * {@link ScreenClass} class constructor
   * @param providerRegistry A {@link ProviderRegistry} used to access underlying implementations
   * @param findHooks A {@link Map} of {@link FindHookCallback} methods assigned to a template image
   */
  constructor(
    private providerRegistry: ProviderRegistry,
    private findHooks: Map<FindInput, FindHookCallback[]> = new Map<
      FindInput,
      FindHookCallback[]
    >()
  ) {}

  /**
   * {@link width} returns the main screen width
   * This refers to the hardware resolution.
   * Screens with higher pixel density (e.g. retina displays in MacBooks) might have a higher width in in actual pixels
   */
  public width() {
    this.providerRegistry.getLogProvider().debug(`Fetching screen width`);
    return this.providerRegistry.getScreen().screenWidth();
  }

  /**
   * {@link height} returns the main screen height
   * This refers to the hardware resolution.
   * Screens with higher pixel density (e.g. retina displays in MacBooks) might have a higher height in in actual pixels
   */
  public height() {
    this.providerRegistry.getLogProvider().debug(`Fetching screen height`);
    return this.providerRegistry.getScreen().screenHeight();
  }

  /**
   * {@link find} will search for a single occurrence of a given search input on a systems main screen
   * @param searchInput A {@link FindInput} instance
   * @param params {@link OptionalSearchParameters} which are used to fine tune search region and / or match confidence
   */
  public async find<PROVIDER_DATA_TYPE>(
    searchInput: RegionResultFindInput | Promise<RegionResultFindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Region>;
  public async find<PROVIDER_DATA_TYPE>(
    searchInput: PointResultFindInput | Promise<PointResultFindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Point>;
  public async find<PROVIDER_DATA_TYPE>(
    searchInput: WindowResultFindInput | Promise<WindowResultFindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Window>;
  public async find<PROVIDER_DATA_TYPE>(
    searchInput: FindInput | Promise<FindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<FindResult>;
  public async find<PROVIDER_DATA_TYPE>(
    searchInput: FindInput | Promise<FindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<FindResult> {
    const needle = await searchInput;
    this.providerRegistry.getLogProvider().info(`Searching for ${needle}`);
    this.validateSearchInput("find", needle);

    try {
      if (isWindowQuery(needle)) {
        this.providerRegistry.getLogProvider().debug(`Running a window search`);
        const windowHandle = await this.providerRegistry
          .getWindowFinder()
          .findMatch(needle);
        const window = new Window(this.providerRegistry, windowHandle);
        const possibleHooks = this.getHooksForInput(needle) || [];
        this.providerRegistry
          .getLogProvider()
          .debug(`${possibleHooks.length} hooks triggered for match`);
        for (const hook of possibleHooks) {
          this.providerRegistry.getLogProvider().debug(`Executing hook`);
          await hook(window);
        }
        return window;
      } else if (
        isRegionResultFindInput(needle) ||
        isPointResultFindInput(needle)
      ) {
        this.logNeedleType(needle);
        const { minMatch, screenSize, searchRegion, screenImage } =
          await this.getFindParameters(params);

        validateSearchRegion(searchRegion, screenSize, this.providerRegistry);
        this.providerRegistry.getLogProvider().debug(`Search region is valid`);
        const matchRequest = createMatchRequest(
          this.providerRegistry,
          needle,
          searchRegion,
          minMatch,
          screenImage,
          params
        );

        if (isRegionResultFindInput(needle)) {
          const matchResult = await getMatchResult(
            this.providerRegistry,
            matchRequest as MatchRequest<
              RegionResultFindInput,
              PROVIDER_DATA_TYPE
            >
          );

          this.providerRegistry
            .getLogProvider()
            .debug("Found match!", matchResult);

          const possibleHooks = this.getHooksForInput(needle) || [];
          this.providerRegistry
            .getLogProvider()
            .debug(`${possibleHooks.length} hooks triggered for match`);
          for (const hook of possibleHooks) {
            this.providerRegistry.getLogProvider().debug(`Executing hook`);
            await hook(matchResult);
          }

          const resultRegion = new Region(
            searchRegion.left + matchResult.location.left,
            searchRegion.top + matchResult.location.top,
            matchResult.location.width,
            matchResult.location.height
          );

          this.providerRegistry
            .getLogProvider()
            .info(`Match is located at ${resultRegion.toString()}`);

          if (this.config.autoHighlight) {
            this.providerRegistry
              .getLogProvider()
              .debug(`Autohighlight is enabled`);
            return this.highlight(resultRegion);
          } else {
            return resultRegion;
          }
        } else if (isPointResultFindInput(needle)) {
          const matchResult = await getMatchResult(
            this.providerRegistry,
            matchRequest as MatchRequest<
              PointResultFindInput,
              PROVIDER_DATA_TYPE
            >
          );

          this.providerRegistry
            .getLogProvider()
            .debug("Found match!", matchResult);

          const possibleHooks = this.getHooksForInput(needle) || [];
          this.providerRegistry
            .getLogProvider()
            .debug(`${possibleHooks.length} hooks triggered for match`);
          for (const hook of possibleHooks) {
            this.providerRegistry.getLogProvider().debug(`Executing hook`);
            await hook(matchResult);
          }

          const resultPoint = new Point(
            searchRegion.left + matchResult.location.x,
            searchRegion.top + matchResult.location.y
          );

          this.providerRegistry
            .getLogProvider()
            .info(`Match is located at ${resultPoint.toString()}`);

          return resultPoint;
        }
      }
      throw new Error(
        `Search input is not supported. Please use a valid search input type.`
      );
    } catch (e) {
      const error = new Error(
        `Searching for ${needle.id} failed. Reason: '${e}'`
      );
      this.providerRegistry.getLogProvider().error(error);
      throw error;
    }
  }

  /**
   * {@link findAll} will search for every occurrence of a given search input on a systems main screen
   * @param searchInput A {@link FindInput} instance to search for
   * @param params {@link OptionalSearchParameters} which are used to fine tune search region and / or match confidence
   */
  public async findAll<PROVIDER_DATA_TYPE>(
    searchInput: RegionResultFindInput | Promise<RegionResultFindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Region[]>;
  public async findAll<PROVIDER_DATA_TYPE>(
    searchInput: PointResultFindInput | Promise<PointResultFindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Point[]>;
  public async findAll<PROVIDER_DATA_TYPE>(
    searchInput: WindowResultFindInput | Promise<WindowResultFindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Window[]>;
  public async findAll<PROVIDER_DATA_TYPE>(
    searchInput: FindInput | Promise<FindInput>,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<FindResult[]> {
    const needle = await searchInput;
    this.providerRegistry.getLogProvider().info(`Searching for ${needle}`);
    this.validateSearchInput("findAll", needle);

    try {
      if (isWindowQuery(needle)) {
        this.providerRegistry.getLogProvider().debug(`Running a window search`);
        const matches = await this.providerRegistry
          .getWindowFinder()
          .findMatches(needle);
        const windows = matches.map(
          (windowHandle: number) =>
            new Window(this.providerRegistry, windowHandle)
        );
        const possibleHooks = this.getHooksForInput(needle) || [];
        this.providerRegistry
          .getLogProvider()
          .debug(
            `${possibleHooks.length} hooks triggered for ${windows.length} matches`
          );
        for (const hook of possibleHooks) {
          for (const wnd of windows) {
            this.providerRegistry.getLogProvider().debug(`Executing hook`);
            await hook(wnd);
          }
        }
        return windows;
      } else if (isRegionResultFindInput(needle)) {
        this.logNeedleType(needle);
        const { minMatch, screenSize, searchRegion, screenImage } =
          await this.getFindParameters(params);

        const matchRequest = createMatchRequest(
          this.providerRegistry,
          needle,
          searchRegion,
          minMatch,
          screenImage,
          params
        );

        validateSearchRegion(searchRegion, screenSize, this.providerRegistry);
        this.providerRegistry.getLogProvider().debug(`Search region is valid`);

        const matchResults = await getMatchResults(
          this.providerRegistry,
          matchRequest
        );
        const possibleHooks = this.getHooksForInput(needle) || [];
        this.providerRegistry
          .getLogProvider()
          .debug(
            `${possibleHooks.length} hooks triggered for ${matchResults.length} matches`
          );
        for (const hook of possibleHooks) {
          for (const matchResult of matchResults) {
            this.providerRegistry.getLogProvider().debug(`Executing hook`);
            await hook(matchResult);
          }
        }
        const resultRegions = matchResults.map((matchResult) => {
          const resultRegion = new Region(
            searchRegion.left + matchResult.location.left,
            searchRegion.top + matchResult.location.top,
            matchResult.location.width,
            matchResult.location.height
          );
          this.providerRegistry
            .getLogProvider()
            .info(`Match is located at ${resultRegion.toString()}`);
          return resultRegion;
        });
        if (this.config.autoHighlight) {
          this.providerRegistry
            .getLogProvider()
            .debug(`Autohighlight is enabled`);
          resultRegions.forEach((region) => {
            if (isRegion(region)) {
              this.highlight(region).catch((e) => {
                this.providerRegistry.getLogProvider().error(e);
              });
            }
          });
          return resultRegions;
        } else {
          return resultRegions;
        }
      } else if (isPointResultFindInput(needle)) {
        this.logNeedleType(needle);
        const { screenSize, searchRegion, screenImage } =
          await this.getFindParameters(params);

        const matchRequest = createMatchRequest(
          this.providerRegistry,
          needle,
          searchRegion,
          0,
          screenImage,
          params
        );

        validateSearchRegion(searchRegion, screenSize, this.providerRegistry);
        this.providerRegistry.getLogProvider().debug(`Search region is valid`);

        const matchResults = await getMatchResults(
          this.providerRegistry,
          matchRequest
        );
        const possibleHooks = this.getHooksForInput(needle) || [];
        this.providerRegistry
          .getLogProvider()
          .debug(
            `${possibleHooks.length} hooks triggered for ${matchResults.length} matches`
          );
        for (const hook of possibleHooks) {
          for (const matchResult of matchResults) {
            this.providerRegistry.getLogProvider().debug(`Executing hook`);
            await hook(matchResult);
          }
        }
        return matchResults.map((matchResult) => {
          const resultPoint = new Point(
            searchRegion.left + matchResult.location.x,
            searchRegion.top + matchResult.location.y
          );
          this.providerRegistry
            .getLogProvider()
            .info(`Match is located at ${resultPoint.toString()}`);
          return resultPoint;
        });
      }
      throw new Error(
        `Search input is not supported. Please use a valid search input type.`
      );
    } catch (e) {
      const error = new Error(
        `Searching for ${needle.id} failed. Reason: '${e}'`
      );
      this.providerRegistry.getLogProvider().error(error);
      throw error;
    }
  }

  /**
   * {@link highlight} highlights a screen {@link Region} for a certain duration by overlaying it with an opaque highlight window
   * @param regionToHighlight The {@link Region} to highlight
   */
  public async highlight(
    regionToHighlight: Region | Promise<Region>
  ): Promise<Region> {
    const highlightRegion = await regionToHighlight;
    if (!isRegion(highlightRegion)) {
      const e = Error(
        `highlight requires an Region, but received ${JSON.stringify(
          highlightRegion
        )}`
      );
      this.providerRegistry.getLogProvider().error(e);
      throw e;
    }
    this.providerRegistry
      .getLogProvider()
      .info(
        `Highlighting ${highlightRegion.toString()} for ${
          this.config.highlightDurationMs / 1000
        } with ${this.config.highlightOpacity * 100}% opacity`
      );
    await this.providerRegistry
      .getScreen()
      .highlightScreenRegion(
        highlightRegion,
        this.config.highlightDurationMs,
        this.config.highlightOpacity
      );
    return highlightRegion;
  }

  /**
   * {@link waitFor} searches for a template image for a specified duration
   * @param searchInput Filename of the template image, relative to {@link ScreenClass.config.resourceDirectory}, or an {@link Image}
   * @param timeoutMs Timeout in milliseconds after which {@link waitFor} fails
   * @param updateInterval Update interval in milliseconds to retry search
   * @param params {@link OptionalSearchParameters} which are used to fine tune search region and / or match confidence
   */
  public async waitFor<PROVIDER_DATA_TYPE>(
    searchInput: RegionResultFindInput | Promise<RegionResultFindInput>,
    timeoutMs?: number,
    updateInterval?: number,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Region>;
  public async waitFor<PROVIDER_DATA_TYPE>(
    searchInput: PointResultFindInput | Promise<PointResultFindInput>,
    timeoutMs?: number,
    updateInterval?: number,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Point>;
  public async waitFor<PROVIDER_DATA_TYPE>(
    searchInput: WindowResultFindInput | Promise<WindowResultFindInput>,
    timeoutMs?: number,
    updateInterval?: number,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<Window>;
  public async waitFor<PROVIDER_DATA_TYPE>(
    searchInput: FindInput | Promise<FindInput>,
    timeoutMs?: number,
    updateInterval?: number,
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ): Promise<FindResult> {
    const needle = await searchInput;

    const timeoutValue = timeoutMs ?? 5000;
    const updateIntervalValue = updateInterval ?? 500;

    this.validateSearchInput("waitFor", needle);

    this.providerRegistry
      .getLogProvider()
      .info(
        `Waiting for ${needle.id} to appear on screen. Timeout: ${
          timeoutValue / 1000
        } seconds, interval: ${updateIntervalValue} ms`
      );
    return timeout(
      updateIntervalValue,
      timeoutValue,
      () => {
        return this.find(needle, params);
      },
      {
        signal: params?.abort,
      }
    );
  }

  /**
   * {@link on} registers a callback which is triggered once a certain searchInput image is found
   * @param searchInput to trigger the callback on
   * @param callback The {@link FindHookCallback} function to trigger
   */
  public on(searchInput: WindowResultFindInput, callback: WindowCallback): void;
  public on(
    searchInput: PointResultFindInput,
    callback: MatchResultCallback<Point>
  ): void;
  public on(
    searchInput: RegionResultFindInput,
    callback: MatchResultCallback<Region>
  ): void;
  public on(searchInput: FindInput, callback: FindHookCallback): void {
    this.validateSearchInput("on", searchInput);

    const existingHooks = this.findHooks.get(searchInput) || [];
    this.findHooks.set(searchInput, [...existingHooks, callback]);
    this.providerRegistry
      .getLogProvider()
      .info(
        `Registered callback for image ${searchInput.id}. There are currently ${
          existingHooks.length + 1
        } hooks registered`
      );
  }

  /**
   * {@link capture} captures a screenshot of a systems main display
   * @param fileName Basename for the generated screenshot
   * @param fileFormat The {@link FileType} for the generated screenshot
   * @param filePath The output path for the generated screenshot (Default: {@link cwd})
   * @param fileNamePrefix Filename prefix for the generated screenshot (Default: empty)
   * @param fileNamePostfix Filename postfix for the generated screenshot (Default: empty)
   */
  public async capture(
    fileName: string,
    fileFormat: FileType = FileType.PNG,
    filePath: string = cwd(),
    fileNamePrefix: string = "",
    fileNamePostfix: string = ""
  ): Promise<string> {
    const currentScreen = await this.providerRegistry.getScreen().grabScreen();
    if (!isImage(currentScreen)) {
      const e = new Error(
        `capture requires an Image, but received ${JSON.stringify(
          currentScreen
        )}`
      );
      this.providerRegistry.getLogProvider().error(e);
      throw e;
    }
    this.providerRegistry
      .getLogProvider()
      .info(
        `Capturing whole screen (0, 0, ${currentScreen.width}, ${currentScreen.height})`
      );
    return this.saveImage(
      currentScreen,
      fileName,
      fileFormat,
      filePath,
      fileNamePrefix,
      fileNamePostfix
    );
  }

  /**
   * {@link grab} grabs screen content of a systems main display
   */
  public async grab(): Promise<Image> {
    const currentScreen = await this.providerRegistry.getScreen().grabScreen();
    this.providerRegistry
      .getLogProvider()
      .info(
        `Grabbed whole screen (0, 0, ${currentScreen.width}, ${currentScreen.height})`
      );
    return currentScreen;
  }

  /**
   * {@link captureRegion} captures a screenshot of a region on the systems main display
   * @param fileName Basename for the generated screenshot
   * @param regionToCapture The region of the screen to capture in the screenshot
   * @param fileFormat The {@link FileType} for the generated screenshot
   * @param filePath The output path for the generated screenshot (Default: {@link cwd})
   * @param fileNamePrefix Filename prefix for the generated screenshot (Default: empty)
   * @param fileNamePostfix Filename postfix for the generated screenshot (Default: empty)
   */
  public async captureRegion(
    fileName: string,
    regionToCapture: Region | Promise<Region>,
    fileFormat: FileType = FileType.PNG,
    filePath: string = cwd(),
    fileNamePrefix: string = "",
    fileNamePostfix: string = ""
  ): Promise<string> {
    const targetRegion = await regionToCapture;
    if (!isRegion(targetRegion)) {
      const e = new Error(
        `captureRegion requires an Region, but received ${JSON.stringify(
          targetRegion
        )}`
      );
      this.providerRegistry.getLogProvider().error(e);
      throw e;
    }
    this.providerRegistry
      .getLogProvider()
      .info(`Capturing screen region ${targetRegion.toString()}`);
    const regionImage = await this.providerRegistry
      .getScreen()
      .grabScreenRegion(targetRegion);
    if (!isImage(regionImage)) {
      const e = new Error(
        `captureRegion requires an Image, but received ${JSON.stringify(
          regionImage
        )}`
      );
      this.providerRegistry.getLogProvider().error(e);
      throw e;
    }
    return this.saveImage(
      regionImage,
      fileName,
      fileFormat,
      filePath,
      fileNamePrefix,
      fileNamePostfix
    );
  }

  /**
   * {@link grabRegion} grabs screen content of a region on the systems main display
   * @param regionToGrab The screen region to grab
   */
  public async grabRegion(
    regionToGrab: Region | Promise<Region>
  ): Promise<Image> {
    const targetRegion = await regionToGrab;
    if (!isRegion(targetRegion)) {
      const e = new Error(
        `grabRegion requires an Region, but received ${JSON.stringify(
          targetRegion
        )}`
      );
      this.providerRegistry.getLogProvider().error(e);
      throw e;
    }
    const screenContent = await this.providerRegistry
      .getScreen()
      .grabScreenRegion(targetRegion);
    this.providerRegistry
      .getLogProvider()
      .info(`Grabbed screen region ${targetRegion.toString()}`);
    return screenContent;
  }

  /**
   * {@link colorAt} returns RGBA color values for a certain pixel at {@link Point} p
   * @param point Location to query color information from
   */
  public async colorAt(point: Point | Promise<Point>) {
    const screenContent = await this.providerRegistry.getScreen().grabScreen();
    const inputPoint = await point;
    if (!isPoint(inputPoint)) {
      const e = new Error(
        `colorAt requires a Point, but received ${JSON.stringify(inputPoint)}`
      );
      this.providerRegistry.getLogProvider().error(e);
      throw e;
    }
    const scaledPoint = new Point(
      inputPoint.x * screenContent.pixelDensity.scaleX,
      inputPoint.y * screenContent.pixelDensity.scaleY
    );
    this.providerRegistry
      .getLogProvider()
      .debug(
        `Point ${inputPoint.toString()} has been scaled by (${
          screenContent.pixelDensity.scaleX
        }, ${screenContent.pixelDensity.scaleY}) into ${scaledPoint.toString()}`
      );
    const color = await this.providerRegistry
      .getImageProcessor()
      .colorAt(screenContent, scaledPoint);
    this.providerRegistry
      .getLogProvider()
      .info(`Color at ${inputPoint.toString()} is ${color.toString()}`);
    return color;
  }

  private async saveImage(
    image: Image,
    fileName: string,
    fileFormat: FileType,
    filePath: string,
    fileNamePrefix: string,
    fileNamePostfix: string
  ) {
    const outputPath = generateOutputPath(fileName, {
      path: filePath,
      postfix: fileNamePostfix,
      prefix: fileNamePrefix,
      type: fileFormat,
    });
    this.providerRegistry
      .getLogProvider()
      .info(`Writing image to ${outputPath}`);
    await this.providerRegistry
      .getImageWriter()
      .store({ image, path: outputPath });
    this.providerRegistry.getLogProvider().debug(`File written`);
    return outputPath;
  }

  private async getFindParameters<PROVIDER_DATA_TYPE>(
    params?: OptionalSearchParameters<PROVIDER_DATA_TYPE>
  ) {
    const minMatch = params?.confidence ?? this.config.confidence;
    const screenSize = await this.providerRegistry.getScreen().screenSize();
    const searchRegion = (await params?.searchRegion) ?? screenSize;
    const screenImage = await this.providerRegistry
      .getScreen()
      .grabScreenRegion(searchRegion);

    const findParameters = {
      minMatch,
      screenSize,
      searchRegion,
      screenImage,
    };
    this.providerRegistry
      .getLogProvider()
      .debug(`Running on-screen search with parameters`, {
        minMatch,
        screenSize,
        searchRegion,
      });
    return findParameters;
  }

  private getHooksForInput(input: WindowResultFindInput): WindowCallback[];
  private getHooksForInput(
    input: RegionResultFindInput
  ): MatchResultCallback<Region>[];
  private getHooksForInput(
    input: PointResultFindInput
  ): MatchResultCallback<Point>[];
  private getHooksForInput(
    input: FindInput
  ):
    | MatchResultCallback<Point>[]
    | MatchResultCallback<Region>[]
    | WindowCallback[] {
    if (isImage(input) || isTextQuery(input)) {
      return this.findHooks.get(input) as MatchResultCallback<Region>[];
    } else if (isColorQuery(input)) {
      return this.findHooks.get(input) as MatchResultCallback<Point>[];
    } else if (isWindowQuery(input)) {
      return this.findHooks.get(input) as WindowCallback[];
    }
    return [];
  }

  private logNeedleType(needle: Image | WordQuery | LineQuery | ColorQuery) {
    if (isImage(needle)) {
      this.providerRegistry.getLogProvider().debug(`Running an image search`);
    } else if (isTextQuery(needle)) {
      this.providerRegistry.getLogProvider().debug(`Running a text search`);
    }
  }

  private validateSearchInput(
    functionName: string,
    needle:
      | Image
      | WordQuery
      | LineQuery
      | WindowResultFindInput
      | PointResultFindInput
      | Promise<FindInput>
  ) {
    if (
      !isImage(needle) &&
      !isTextQuery(needle) &&
      !isWindowQuery(needle) &&
      !isColorQuery(needle)
    ) {
      const e = Error(
        `${functionName} requires an Image, a text query, a color query or a window query, but received ${JSON.stringify(
          needle
        )}`
      );
      this.providerRegistry.getLogProvider().error(e, { needle });
      throw e;
    }
  }
}
