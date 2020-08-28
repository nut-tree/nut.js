import { Image } from "../image.class";
import { MatchRequest } from "../match-request.class";
import { MatchResult } from "../match-result.class";
import ScreenAction from "../provider/native/libnut-screen-action.class";
import { ScreenActionProvider } from "../provider/native/screen-action-provider.interface";
import { DataSink } from "../provider/opencv/data-sink.interface";
import { FinderInterface } from "../provider/opencv/finder.interface";
import { ImageWriter } from "../provider/opencv/image-writer.class";
import TemplateMatchingFinder from "../provider/opencv/template-matching-finder.class";
import { Region } from "../region.class";

/**
 * {@link VisionAdapter} serves as an abstraction layer for all image based interactions.
 *
 * This allows to provide a high level interface for image based actions,
 * without having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve screenshots / images are bundled in this adapter.
 */
export class VisionAdapter {
  /**
   * {@link VisionAdapter} class constructor
   * @param finder A {@link FinderInterface} instance used for on-screen image detection (Default: {@link TemplateMatchingFinder})
   * @param screen A {@link ScreenActionProvider} instance used to retrieve screen data (Default: {@link ScreenAction})
   * @param dataSink A {@link DataSink} instance used to write output data to disk (Default: {@link ImageWriter})
   */
  constructor(
    private finder: FinderInterface = new TemplateMatchingFinder(),
    private screen: ScreenActionProvider = new ScreenAction(),
    private dataSink: DataSink = new ImageWriter()
  ) {
  }

  /**
   * {@link grabScreen} will return an {@link Image} containing the current screen image
   *
   * @returns An {@link Image} which will contain screenshot data as well as dimensions
   */
  public grabScreen(): Promise<Image> {
    return this.screen.grabScreen();
  }

  /**
   * {@link grabScreenRegion} essentially does the same as grabScreen, but only returns a specified {@link Region}
   *
   * @param region The screen {@link Region} we want to grab
   * @returns An {@link Image} which will contain screenshot data of the specified {@link Region} as well as dimensions
   */
  public grabScreenRegion(region: Region): Promise<Image> {
    return this.screen.grabScreenRegion(region);
  }

  /**
   * {@link highlightScreenRegion} highlights a screen {@link Region} for a given duration by overlaying it with an opaque window
   *
   * @param region The {@link Region} to highlight
   * @param duration The highlight duration
   * @param opacity Overlay opacity
   */
  public highlightScreenRegion(region: Region, duration: number, opacity: number): Promise<void> {
    return this.screen.highlightScreenRegion(region, duration, opacity);
  }

  /**
   * {@link findOnScreenRegion} will search for a given pattern inside a {@link Region} of the main screen
   * If multiple possible occurrences are found, the one with the highest probability is returned.
   * For matchProbability < 0.99 the search will be performed on grayscale images.
   *
   * @param matchRequest A {@link MatchRequest} which holds all required matching data
   * @returns {@link MatchResult} containing location and probability of a possible match
   */
  public async findOnScreenRegion(
    matchRequest: MatchRequest,
  ): Promise<MatchResult> {
    return new Promise<MatchResult>(async (resolve, reject) => {
      try {
        const matchResult = await this.finder.findMatch(matchRequest);
        resolve(matchResult);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * {@link screenWidth} returns the main screens width as reported by the OS.
   * Please notice that on e.g. Apples Retina display the reported width
   * and the actual pixel size may differ
   *
   * @returns The main screens width as reported by the OS
   */
  public screenWidth(): Promise<number> {
    return this.screen.screenWidth();
  }

  /**
   * {@link screenHeight} returns the main screens height as reported by the OS.
   * Please notice that on e.g. Apples Retina display the reported width
   * and the actual pixel size may differ
   *
   * @returns The main screens height as reported by the OS
   */
  public screenHeight(): Promise<number> {
    return this.screen.screenHeight();
  }

  /**
   * {@link screenSize} returns a {@link Region} object with the main screens size.
   * Please note that on e.g. Apples Retina display the reported width
   * and the actual pixel size may differ
   *
   * @returns A {@link Region} object representing the size of a systems main screen
   */
  public screenSize(): Promise<Region> {
    return this.screen.screenSize();
  }

  /**
   * {@link saveImage} saves an {@link Image} to a given path on disk.
   *
   * @param image The {@link Image} to store
   * @param path The path where to store the image
   */
  public saveImage(image: Image, path: string): Promise<void> {
    return (this.dataSink as ImageWriter).store(image, path);
  }
}
