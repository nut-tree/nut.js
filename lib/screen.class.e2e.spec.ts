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

  it("should capture the screen and save file with prefix", async () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);
    const prefix = "foo_";

    // WHEN
    const filename = await SUT.capture("asdf.txt", FileType.JPG, "./", prefix);

    // THEN
    expect(filename.includes(prefix)).toBeTruthy();
    expect(filename).not.toBeNull();
    await sleep(1000);
    expect(existsSync(filename)).toBeTruthy();
  });

  it("should capture the screen and save file with postfix", async () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);
    const postfix = "_bar";

    // WHEN
    const filename = await SUT.capture("asdf.txt", FileType.JPG, "./", "", postfix);

    // THEN
    expect(filename.includes(postfix)).toBeTruthy();
    expect(filename).not.toBeNull();
    await sleep(1000);
    expect(existsSync(filename)).toBeTruthy();
  });

  it("should capture the screen and save file with pre- and postfix", async () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);
    const filename = "asdf";
    const prefix = "foo_";
    const postfix = "_bar";

    // WHEN
    const output = await SUT.capture("asdf", FileType.JPG, "./", prefix, postfix);

    // THEN
    expect(output.includes(`${prefix}${filename}${postfix}`)).toBeTruthy();
    expect(output).not.toBeNull();
    await sleep(1000);
    expect(existsSync(output)).toBeTruthy();
  });
});
