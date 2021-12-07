import {cwd} from "process";
import {FileType} from "./file-type.enum";
import {generateOutputPath} from "./generate-output-path.function";
import {LocationParameters} from "./locationparameters.class";
import {MatchRequest} from "./match-request.class";
import {MatchResult} from "./match-result.class";
import {Region} from "./region.class";
import {timeout} from "./util/timeout.function";
import {Image} from "./image.class";
import {ProviderRegistry} from "./provider/provider-registry.class";
import {FirstArgumentType} from "./typings";
import {Point} from "./point.class";

export type FindHookCallback = (target: MatchResult) => Promise<void>;

function validateSearchRegion(search: Region, screen: Region) {
    if (search.left < 0 || search.top < 0 || search.width < 0 || search.height < 0) {
        throw new Error(`Negative values in search region ${search}`)
    }
    if (isNaN(search.left) || isNaN(search.top) || isNaN(search.width) || isNaN(search.height)) {
        throw new Error(`NaN values in search region ${search}`)
    }
    if (search.width < 2 || search.height < 2) {
        throw new Error(`Search region ${search} is not large enough. Must be at least two pixels in both width and height.`)
    }
    if (search.left + search.width > screen.width || search.top + search.height > screen.height) {
        throw new Error(`Search region ${search} extends beyond screen boundaries (${screen.width}x${screen.height})`)
    }
}

/**
 * {@link ScreenClass} class provides methods to access screen content of a systems main display
 */
export class ScreenClass {

    /**
     * Config object for {@link ScreenClass} class
     */
    public config = {
        /**
         * Configures the required matching percentage for template images to be declared as a match
         */
        confidence: 0.99,

        /**
         * Configure whether to auto highlight all search results or not
         */
        autoHighlight: false,
        /**
         * Configure highlighting duration
         */
        highlightDurationMs: 500,

        /**
         * Configure opacity of highlight window
         */
        highlightOpacity: 0.25,

        /**
         * Configures the path from which template images are loaded from
         */
        resourceDirectory: cwd(),
    };

    /**
     * {@link ScreenClass} class constructor
     * @param providerRegistry A {@link ProviderRegistry} used to access underlying implementations
     * @param findHooks A {@link Map} of {@link FindHookCallback} methods assigned to a template image
     */
    constructor(
        private providerRegistry: ProviderRegistry,
        private findHooks: Map<string | Image, FindHookCallback[]> = new Map<string | Image, FindHookCallback[]>()) {
    }

    /**
     * {@link width} returns the main screen width
     * This refers to the hardware resolution.
     * Screens with higher pixel density (e.g. retina displays in MacBooks) might have a higher width in in actual pixels
     */
    public width() {
        return this.providerRegistry.getScreen().screenWidth();
    }

    /**
     * {@link height} returns the main screen height
     * This refers to the hardware resolution.
     * Screens with higher pixel density (e.g. retina displays in MacBooks) might have a higher height in in actual pixels
     */
    public height() {
        return this.providerRegistry.getScreen().screenHeight();
    }

    /**
     * {@link find} will search for a single occurrence of a template image on a systems main screen
     * @param template Template {@link Image} instance
     * @param params {@link LocationParameters} which are used to fine tune search region and / or match confidence
     */
    public async find(
        template: Image | Promise<Image>,
        params?: LocationParameters,
    ): Promise<Region> {
        const minMatch = (params && params.confidence) || this.config.confidence;
        const screenSize = await this.providerRegistry.getScreen().screenSize();
        const searchRegion = (params && params.searchRegion) || screenSize;
        const searchMultipleScales = (params && params.searchMultipleScales)

        const needle = await template;

        const screenImage = await this.providerRegistry.getScreen().grabScreenRegion(searchRegion);

        const matchRequest = new MatchRequest(
            screenImage,
            needle,
            minMatch,
            searchMultipleScales
        );

        return new Promise<Region>(async (resolve, reject) => {
            try {
                validateSearchRegion(searchRegion, screenSize);
                const matchResult = await this.providerRegistry.getImageFinder().findMatch(matchRequest);
                const possibleHooks = this.findHooks.get(needle) || [];
                for (const hook of possibleHooks) {
                    await hook(matchResult);
                }
                const resultRegion = new Region(
                    searchRegion.left + matchResult.location.left,
                    searchRegion.top + matchResult.location.top,
                    matchResult.location.width,
                    matchResult.location.height
                )
                if (this.config.autoHighlight) {
                    resolve(this.highlight(resultRegion));
                } else {
                    resolve(resultRegion);
                }
            } catch (e) {
                reject(
                    `Searching for ${needle.id} failed. Reason: '${e}'`,
                );
            }
        });
    }

    /**
     * {@link findAll} will search for every occurrences of a template image on a systems main screen
     * @param template Template {@link Image} instance
     * @param params {@link LocationParameters} which are used to fine tune search region and / or match confidence
     */
    public async findAll(
        template: FirstArgumentType<typeof ScreenClass.prototype.find>,
        params?: LocationParameters,
    ): Promise<Region[]> {
        const minMatch = (params && params.confidence) || this.config.confidence;
        const screenSize = await this.providerRegistry.getScreen().screenSize();
        const searchRegion = (params && params.searchRegion) || screenSize;
        const searchMultipleScales = (params && params.searchMultipleScales)

        const needle = await template;

        const screenImage = await this.providerRegistry.getScreen().grabScreenRegion(searchRegion);

        const matchRequest = new MatchRequest(
            screenImage,
            needle,
            minMatch,
            searchMultipleScales
        );

        return new Promise<Region[]>(async (resolve, reject) => {
            try {
                validateSearchRegion(searchRegion, screenSize);
                const matchResults = await this.providerRegistry.getImageFinder().findMatches(matchRequest);
                const possibleHooks = this.findHooks.get(needle) || [];
                for (const hook of possibleHooks) {
                    for (const matchResult of matchResults) {
                        await hook(matchResult);
                    }
                }
                const resultRegions = matchResults.map(matchResult => {
                    return new Region(
                        searchRegion.left + matchResult.location.left,
                        searchRegion.top + matchResult.location.top,
                        matchResult.location.width,
                        matchResult.location.height
                    )
                })
                if (this.config.autoHighlight) {
                    resultRegions.forEach(region => this.highlight(region));
                    resolve(resultRegions);
                } else {
                    resolve(resultRegions);
                }
            } catch (e) {
                reject(
                    `Searching for ${needle.id} failed. Reason: '${e}'`,
                );
            }
        });
    }

    /**
     * {@link highlight} highlights a screen {@link Region} for a certain duration by overlaying it with an opaque highlight window
     * @param regionToHighlight The {@link Region} to highlight
     */
    public async highlight(regionToHighlight: Region | Promise<Region>): Promise<Region> {
        const highlightRegion = await regionToHighlight;
        await this.providerRegistry.getScreen().highlightScreenRegion(highlightRegion, this.config.highlightDurationMs, this.config.highlightOpacity);
        return highlightRegion;
    }

    /**
     * {@link waitFor} searches for a template image for a specified duration
     * @param templateImage Filename of the template image, relative to {@link ScreenClass.config.resourceDirectory}, or an {@link Image}
     * @param timeoutMs Timeout in milliseconds after which {@link waitFor} fails
     * @param updateInterval Update interval in milliseconds to retry search
     * @param params {@link LocationParameters} which are used to fine tune search region and / or match confidence
     */
    public async waitFor(
        templateImage: FirstArgumentType<typeof ScreenClass.prototype.find>,
        timeoutMs: number = 5000,
        updateInterval: number = 500,
        params?: LocationParameters,
    ): Promise<Region> {
        return timeout(updateInterval, timeoutMs, () => this.find(templateImage, params), {signal: params?.abort});
    }

    /**
     * {@link on} registers a callback which is triggered once a certain template image is found
     * @param templateImage Template image to trigger the callback on
     * @param callback The {@link FindHookCallback} function to trigger
     */
    public on(templateImage: string | Image, callback: FindHookCallback) {
        const existingHooks = this.findHooks.get(templateImage) || [];
        this.findHooks.set(templateImage, [...existingHooks, callback]);
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
        fileNamePostfix: string = ""): Promise<string> {
        const currentScreen = await this.providerRegistry.getScreen().grabScreen();
        return this.saveImage(
            currentScreen,
            fileName,
            fileFormat,
            filePath,
            fileNamePrefix,
            fileNamePostfix);
    }

    /**
     * {@link grab} grabs screen content of a systems main display
     */
    public async grab(): Promise<Image> {
        return this.providerRegistry.getScreen().grabScreen();
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
        fileNamePostfix: string = ""): Promise<string> {
        const regionImage = await this.providerRegistry.getScreen().grabScreenRegion(await regionToCapture);
        return this.saveImage(
            regionImage,
            fileName,
            fileFormat,
            filePath,
            fileNamePrefix,
            fileNamePostfix);
    }

    /**
     * {@link grabRegion} grabs screen content of a region on the systems main display
     * @param regionToGrab The screen region to grab
     */
    public async grabRegion(regionToGrab: Region | Promise<Region>): Promise<Image> {
        return this.providerRegistry.getScreen().grabScreenRegion(await regionToGrab);
    }

    /**
     * {@link colorAt} returns RGBA color values for a certain pixel at {@link Point} p
     * @param point Location to query color information from
     */
    public async colorAt(point: Point | Promise<Point>) {
        const screenContent = this.providerRegistry.getScreen().grabScreen();
        return this.providerRegistry.getImageProcessor().colorAt(screenContent, point);
    }

    private async saveImage(
        image: Image,
        fileName: string,
        fileFormat: FileType,
        filePath: string,
        fileNamePrefix: string,
        fileNamePostfix: string) {
        const outputPath = generateOutputPath(fileName, {
            path: filePath,
            postfix: fileNamePostfix,
            prefix: fileNamePrefix,
            type: fileFormat,
        });
        await this.providerRegistry.getImageWriter().store({data: image, path: outputPath})
        return outputPath;
    }
}
