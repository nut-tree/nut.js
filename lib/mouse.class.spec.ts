import { Button } from "./button.enum";
import { MouseClass } from "./mouse.class";
import { Point } from "./point.class";
import { LineHelper } from "./util/linehelper.class";
import { ProviderRegistry } from "./provider/provider-registry.class";
import { mockPartial } from "sneer";
import { MouseProviderInterface } from "./provider";

beforeEach(() => {
  jest.clearAllMocks();
});

const linehelper = new LineHelper();

const providerRegistryMock = mockPartial<ProviderRegistry>({
  getMouse(): MouseProviderInterface {
    return mockPartial<MouseProviderInterface>({
      setMouseDelay: jest.fn(),
    });
  },
});

describe("Mouse class", () => {
  it("should have a default delay of 500 ms", () => {
    // GIVEN
    const SUT = new MouseClass(providerRegistryMock);

    // WHEN

    // THEN
    expect(SUT.config.autoDelayMs).toEqual(100);
  });

  it("should forward scrollLeft to the provider", async () => {
    // GIVEN
    const SUT = new MouseClass(providerRegistryMock);
    const scrollAmount = 5;

    const scrollMock = jest.fn();
    providerRegistryMock.getMouse = jest.fn(() =>
      mockPartial<MouseProviderInterface>({
        setMouseDelay: jest.fn(),
        scrollLeft: scrollMock,
      })
    );

    // WHEN
    const result = await SUT.scrollLeft(scrollAmount);

    // THEN
    expect(scrollMock).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollRight to the provider", async () => {
    // GIVEN
    const SUT = new MouseClass(providerRegistryMock);
    const scrollAmount = 5;

    const scrollMock = jest.fn();
    providerRegistryMock.getMouse = jest.fn(() =>
      mockPartial<MouseProviderInterface>({
        setMouseDelay: jest.fn(),
        scrollRight: scrollMock,
      })
    );

    // WHEN
    const result = await SUT.scrollRight(scrollAmount);

    // THEN
    expect(scrollMock).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollDown to the provider", async () => {
    // GIVEN
    const SUT = new MouseClass(providerRegistryMock);
    const scrollAmount = 5;

    const scrollMock = jest.fn();
    providerRegistryMock.getMouse = jest.fn(() =>
      mockPartial<MouseProviderInterface>({
        setMouseDelay: jest.fn(),
        scrollDown: scrollMock,
      })
    );

    // WHEN
    const result = await SUT.scrollDown(scrollAmount);

    // THEN
    expect(scrollMock).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollUp to the provider", async () => {
    // GIVEN
    const SUT = new MouseClass(providerRegistryMock);
    const scrollAmount = 5;

    const scrollMock = jest.fn();
    providerRegistryMock.getMouse = jest.fn(() =>
      mockPartial<MouseProviderInterface>({
        setMouseDelay: jest.fn(),
        scrollUp: scrollMock,
      })
    );

    // WHEN
    const result = await SUT.scrollUp(scrollAmount);

    // THEN
    expect(scrollMock).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("update mouse position along path on move", async () => {
    // GIVEN
    const SUT = new MouseClass(providerRegistryMock);
    const path = linehelper.straightLine(new Point(0, 0), new Point(10, 10));

    const setPositionMock = jest.fn();
    providerRegistryMock.getMouse = jest.fn(() =>
      mockPartial<MouseProviderInterface>({
        setMouseDelay: jest.fn(),
        setMousePosition: setPositionMock,
      })
    );

    // WHEN
    const result = await SUT.move(path);

    // THEN
    expect(setPositionMock).toBeCalledTimes(path.length);
    expect(result).toBe(SUT);
  });

  it("should press and hold left mouse button, move and release left mouse button on drag", async () => {
    // GIVEN
    const SUT = new MouseClass(providerRegistryMock);
    const path = linehelper.straightLine(new Point(0, 0), new Point(10, 10));

    const setPositionMock = jest.fn();
    const pressButtonMock = jest.fn();
    const releaseButtonMock = jest.fn();
    providerRegistryMock.getMouse = jest.fn(() =>
      mockPartial<MouseProviderInterface>({
        setMouseDelay: jest.fn(),
        setMousePosition: setPositionMock,
        pressButton: pressButtonMock,
        releaseButton: releaseButtonMock,
      })
    );

    // WHEN
    const result = await SUT.drag(path);

    // THEN
    expect(pressButtonMock).toBeCalledWith(Button.LEFT);
    expect(setPositionMock).toBeCalledTimes(path.length);
    expect(releaseButtonMock).toBeCalledWith(Button.LEFT);
    expect(result).toBe(SUT);
  });

  describe("Mousebuttons", () => {
    it.each([
      [Button.LEFT, Button.LEFT],
      [Button.MIDDLE, Button.MIDDLE],
      [Button.RIGHT, Button.RIGHT],
    ] as Array<[Button, Button]>)(
      "should be pressed and released",
      async (input: Button, expected: Button) => {
        // GIVEN
        const SUT = new MouseClass(providerRegistryMock);
        const pressButtonMock = jest.fn();
        const releaseButtonMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() =>
          mockPartial<MouseProviderInterface>({
            setMouseDelay: jest.fn(),
            pressButton: pressButtonMock,
            releaseButton: releaseButtonMock,
          })
        );

        // WHEN
        const pressed = await SUT.pressButton(input);
        const released = await SUT.releaseButton(input);

        // THEN
        expect(pressButtonMock).toBeCalledWith(expected);
        expect(releaseButtonMock).toBeCalledWith(expected);
        expect(pressed).toBe(SUT);
        expect(released).toBe(SUT);
      }
    );

    describe("autoDelayMs", () => {
      it("pressButton should respect configured delay", async () => {
        // GIVEN
        const SUT = new MouseClass(providerRegistryMock);
        const delay = 100;
        SUT.config.autoDelayMs = delay;

        const mouseMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() =>
          mockPartial<MouseProviderInterface>({
            setMouseDelay: jest.fn(),
            pressButton: mouseMock,
          })
        );

        // WHEN
        const start = Date.now();
        await SUT.pressButton(Button.LEFT);
        const duration = Date.now() - start;

        // THEN
        expect(duration).toBeGreaterThanOrEqual(delay);
      });

      it("releaseButton should respect configured delay", async () => {
        // GIVEN
        const SUT = new MouseClass(providerRegistryMock);
        const delay = 100;
        SUT.config.autoDelayMs = delay;

        const mouseMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() =>
          mockPartial<MouseProviderInterface>({
            setMouseDelay: jest.fn(),
            releaseButton: mouseMock,
          })
        );

        // WHEN
        const start = Date.now();
        await SUT.releaseButton(Button.LEFT);
        const duration = Date.now() - start;

        // THEN
        expect(duration).toBeGreaterThanOrEqual(delay);
      });
    });
  });

  describe("click and doubleClick", () => {
    describe("click", () => {
      it.each([
        [Button.LEFT, Button.LEFT],
        [Button.MIDDLE, Button.MIDDLE],
        [Button.RIGHT, Button.RIGHT],
      ] as Array<[Button, Button]>)(
        "should click the respective button on the provider",
        async (input: Button, expected: Button) => {
          // GIVEN
          const SUT = new MouseClass(providerRegistryMock);
          const clickMock = jest.fn();
          providerRegistryMock.getMouse = jest.fn(() =>
            mockPartial<MouseProviderInterface>({
              setMouseDelay: jest.fn(),
              click: clickMock,
            })
          );

          // WHEN
          await SUT.click(input);

          // THEN
          expect(clickMock).toBeCalledWith(expected);
        }
      );
    });

    describe("doubleClick", () => {
      it.each([
        [Button.LEFT, Button.LEFT],
        [Button.MIDDLE, Button.MIDDLE],
        [Button.RIGHT, Button.RIGHT],
      ] as Array<[Button, Button]>)(
        "should click the respective button on the provider",
        async (input: Button, expected: Button) => {
          // GIVEN
          const SUT = new MouseClass(providerRegistryMock);
          const clickMock = jest.fn();
          providerRegistryMock.getMouse = jest.fn(() =>
            mockPartial<MouseProviderInterface>({
              setMouseDelay: jest.fn(),
              doubleClick: clickMock,
            })
          );

          // WHEN
          await SUT.doubleClick(input);

          // THEN
          expect(clickMock).toBeCalledWith(expected);
        }
      );
    });

    describe("leftClick", () => {
      it("should use click internally", async () => {
        // GIVEN
        const SUT = new MouseClass(providerRegistryMock);

        const clickSpy = jest.spyOn(SUT, "click");
        const clickMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() =>
          mockPartial<MouseProviderInterface>({
            setMouseDelay: jest.fn(),
            click: clickMock,
          })
        );

        // WHEN
        const result = await SUT.leftClick();

        // THEN
        expect(clickSpy).toBeCalledWith(Button.LEFT);
        expect(clickMock).toBeCalledWith(Button.LEFT);
        expect(result).toBe(SUT);
      });
    });

    describe("rightClick", () => {
      it("should use click internally", async () => {
        // GIVEN
        const SUT = new MouseClass(providerRegistryMock);

        const clickSpy = jest.spyOn(SUT, "click");
        const clickMock = jest.fn();
        providerRegistryMock.getMouse = jest.fn(() =>
          mockPartial<MouseProviderInterface>({
            setMouseDelay: jest.fn(),
            click: clickMock,
          })
        );

        // WHEN
        const result = await SUT.rightClick();

        // THEN
        expect(clickSpy).toBeCalledWith(Button.RIGHT);
        expect(clickMock).toBeCalledWith(Button.RIGHT);
        expect(result).toBe(SUT);
      });
    });
  });
});
