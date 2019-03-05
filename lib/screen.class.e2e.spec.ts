import { existsSync } from "fs";
import { VisionAdapter } from "./adapter/vision.adapter.class";
import { FileType } from "./file-type.enum";
import { Screen } from "./screen.class";
import { sleep } from "./sleep.function";

describe("Screen.", () => {
  it("should capture the screen", () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);

    // WHEN
    SUT.capture("asdf", FileType.PNG).then(filename => {
      // THEN
      expect(filename).not.toBeNull();
      sleep(1000).then(() => {
        expect(existsSync(filename)).toBeTruthy();
      });
    });
  });

  it("should capture the screen and save to JPG", () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);

    // WHEN
    SUT.capture("asdf", FileType.JPG).then(filename => {
      // THEN
      expect(filename).not.toBeNull();
      sleep(1000).then(() => {
        expect(existsSync(filename)).toBeTruthy();
      });
    });
  });

  it("should capture the screen and save file with prefix", () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);
    const prefix = "foo_";

    // WHEN
    SUT.capture("asdf", FileType.JPG, "./", prefix).then(filename => {
      // THEN
      expect(filename.includes(prefix)).toBeTruthy();
      expect(filename).not.toBeNull();
      sleep(1000).then(() => {
        expect(existsSync(filename)).toBeTruthy();
      });
    });
  });

  it("should capture the screen and save file with postfix", () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);
    const postfix = "_bar";

    // WHEN
    SUT.capture("asdf", FileType.JPG, "./", "", postfix).then(filename => {
      // THEN
      expect(filename.includes(postfix)).toBeTruthy();
      expect(filename).not.toBeNull();
      sleep(1000).then(() => {
        expect(existsSync(filename)).toBeTruthy();
      });
    });
  });

  it("should capture the screen and save file with pre- and postfix", () => {
    // GIVEN
    const visionAdapter = new VisionAdapter();
    const SUT = new Screen(visionAdapter);
    const filename = "asdf";
    const prefix = "foo_";
    const postfix = "_bar";

    // WHEN
    SUT.capture("asdf", FileType.JPG, "./", prefix, postfix).then(output => {
      // THEN
      expect(output.includes(`${prefix}${filename}${postfix}`)).toBeTruthy();
      expect(output).not.toBeNull();
      sleep(1000).then(() => {
        expect(existsSync(output)).toBeTruthy();
      });
    });
  });
});
