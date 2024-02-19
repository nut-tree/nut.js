import { join } from "path";
import { cwd } from "process";
import { FileType } from "@nut-tree/shared";
import { generateOutputPath } from "./generate-output-path.function";

describe("generate-output-path", () => {
  it("should default to a PNG file without pre- or postfix in the current directory", () => {
    // GIVEN
    const filename = "asdf";
    const ext = FileType.PNG;
    const expectedPath = join(cwd(), `${filename}${ext}`);

    // WHEN
    const result = generateOutputPath(filename);

    // THEN
    expect(result).toEqual(expectedPath);
  });

  it("should should allow to add a prefix to the filename", () => {
    // GIVEN
    const filename = "asdf";
    const pre = "foo_";
    const ext = FileType.PNG;
    const expectedPath = join(cwd(), `${pre}${filename}${ext}`);

    // WHEN
    const result = generateOutputPath(filename, { prefix: pre });

    // THEN
    expect(result).toEqual(expectedPath);
  });

  it("should should allow to add a postfix to the filename", () => {
    // GIVEN
    const filename = "asdf";
    const post = "_bar";
    const ext = FileType.PNG;
    const expectedPath = join(cwd(), `${filename}${post}${ext}`);

    // WHEN
    const result = generateOutputPath(filename, { postfix: post });

    // THEN
    expect(result).toEqual(expectedPath);
  });

  it("should should allow to add both a prefix and a postfix to the filename", () => {
    // GIVEN
    const filename = "asdf";
    const pre = "foo_";
    const post = "_bar";
    const ext = FileType.PNG;
    const expectedPath = join(cwd(), `${pre}${filename}${post}${ext}`);

    // WHEN
    const result = generateOutputPath(filename, {
      postfix: post,
      prefix: pre
    });

    // THEN
    expect(result).toEqual(expectedPath);
  });

  it("should should allow to configure the file path", () => {
    // GIVEN
    const filename = "asdf";
    const filepath = "/foo/test/bar";
    const ext = FileType.PNG;
    const expectedPath = join(filepath, `${filename}${ext}`);

    // WHEN
    const result = generateOutputPath(filename, {
      path: filepath
    });

    // THEN
    expect(result).toEqual(expectedPath);
  });

  it("should handle relative file path", () => {
    // GIVEN
    const filename = "asdf";
    const filepath = "/foo/../bar";
    const ext = FileType.PNG;
    const expectedPath = join(filepath, `${filename}${ext}`);

    // WHEN
    const result = generateOutputPath(filename, {
      path: filepath
    });

    // THEN
    expect(result).toEqual(expectedPath);
  });

  it("should handle different file types", () => {
    // GIVEN
    const filename = "asdf";
    const ext = FileType.JPG;
    const expectedPath = join(cwd(), `${filename}${ext}`);

    // WHEN
    const result = generateOutputPath(filename, {
      type: FileType.JPG
    });

    // THEN
    expect(result).toEqual(expectedPath);
  });
});
