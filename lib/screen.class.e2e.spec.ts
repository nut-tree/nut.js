import { existsSync } from "fs";
import { VisionAdapter } from "./adapter/vision.adapter.class";
import { FileType } from "./file-type.enum";
import { Screen } from "./screen.class";
import { sleep } from "./sleep.function";

describe("Screen.", () => {
  it("should capture the screen", async () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);

    // WHEN
    const filename = await SUT.capture("asdf.txt", FileType.PNG);

    // THEN
    expect(filename).not.toBeNull();
    await sleep(1000);
    expect(existsSync(filename)).toBeTruthy();
  });

  it("should capture the screen and save to JPG", async () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);

    // WHEN
    const filename = await SUT.capture("asdf.txt", FileType.JPG);

    // THEN
    expect(filename).not.toBeNull();
    await sleep(1000);
    expect(existsSync(filename)).toBeTruthy();
  });
});
