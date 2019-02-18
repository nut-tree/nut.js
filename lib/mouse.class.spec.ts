import { LineHelper } from "../dist/lib/util/linehelper.class";
import { NativeAdapter } from "./adapter/native.adapter.class";
import { Button } from "./button.enum";
import { Mouse } from "./mouse.class";
import { Point } from "./point.class";

jest.mock("./adapter/native.adapter.class");

beforeEach(() => {
  jest.resetAllMocks();
});

const linehelper = new LineHelper();

describe("Mouse class", () => {
  it("should forward scrollLeft to the native adapter class", () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const scrollAmount = 5;

    // WHEN
    const result = SUT.scrollLeft(scrollAmount);

    // THEN
    expect(nativeAdapterMock.scrollLeft).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollRight to the native adapter class", () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const scrollAmount = 5;

    // WHEN
    const result = SUT.scrollRight(scrollAmount);

    // THEN
    expect(nativeAdapterMock.scrollRight).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollDown to the native adapter class", () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const scrollAmount = 5;

    // WHEN
    const result = SUT.scrollDown(scrollAmount);

    // THEN
    expect(nativeAdapterMock.scrollDown).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollUp to the native adapter class", () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const scrollAmount = 5;

    // WHEN
    const result = SUT.scrollUp(scrollAmount);

    // THEN
    expect(nativeAdapterMock.scrollUp).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward leftClick to the native adapter class", () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);

    // WHEN
    const result = SUT.leftClick();

    // THEN
    expect(nativeAdapterMock.leftClick).toBeCalled();
    expect(result).toBe(SUT);
  });

  it("should forward rightClick to the native adapter class", () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);

    // WHEN
    const result = SUT.rightClick();

    // THEN
    expect(nativeAdapterMock.rightClick).toBeCalled();
    expect(result).toBe(SUT);
  });

  it("update mouse position along path on move", () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const path = linehelper.straightLine(new Point(0, 0), new Point(10, 10));

    // WHEN
    const result = SUT.move(path);

    // THEN
    expect(nativeAdapterMock.setMousePosition).toBeCalledTimes(path.length);
    expect(result).toBe(SUT);
  });

  it("should press and hold left mouse button, move and release left mouse button on drag", () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const path = linehelper.straightLine(new Point(0, 0), new Point(10, 10));

    // WHEN
    const result = SUT.drag(path);

    // THEN
    expect(nativeAdapterMock.pressButton).toBeCalledWith(Button.LEFT);
    expect(nativeAdapterMock.setMousePosition).toBeCalledTimes(path.length);
    expect(nativeAdapterMock.releaseButton).toBeCalledWith(Button.LEFT);
    expect(result).toBe(SUT);
  });
});
