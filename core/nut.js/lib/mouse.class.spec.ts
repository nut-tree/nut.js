import { Button, Point } from "@nut-tree/shared";
import { MouseClass } from "./mouse.class";
import { LineHelper } from "./util/linehelper.class";
import { mockPartial } from "sneer";
import { MouseProviderInterface, ProviderRegistry } from "@nut-tree/provider-interfaces";
import { NoopLogProvider } from "./provider/log/noop-log-provider.class";

beforeEach(() => {
  jest.clearAllMocks();
});

const linehelper = new LineHelper();

const providerRegistryMock = mockPartial<ProviderRegistry>({
  getMouse(): MouseProviderInterface {
    return mockPartial<MouseProviderInterface>({
      setMouseDelay: jest.fn()
    });
  },
  hasMouse(): boolean {
    return true;
  }
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
        scrollLeft: scrollMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();

    // WHEN
    const result = await SUT.scrollLeft(scrollAmount);

    // THEN
    expect(scrollMock).toHaveBeenCalledWith(scrollAmount);
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
        scrollRight: scrollMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();

    // WHEN
    const result = await SUT.scrollRight(scrollAmount);

    // THEN
    expect(scrollMock).toHaveBeenCalledWith(scrollAmount);
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
        scrollDown: scrollMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();

    // WHEN
    const result = await SUT.scrollDown(scrollAmount);

    // THEN
    expect(scrollMock).toHaveBeenCalledWith(scrollAmount);
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
        scrollUp: scrollMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();

    // WHEN
    const result = await SUT.scrollUp(scrollAmount);

    // THEN
    expect(scrollMock).toHaveBeenCalledWith(scrollAmount);
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
        setMousePosition: setPositionMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();

    // WHEN
    const result = await SUT.move(path);

    // THEN
    expect(setPositionMock).toHaveBeenCalledTimes(path.length);
    expect(result).toBe(SUT);
  });

  it("should convert single point inputs to an array", async () => {
    // GIVEN
    const SUT = new MouseClass(providerRegistryMock);
    const testPoint = new Point(0, 0);

    const setPositionMock = jest.fn();
    providerRegistryMock.getMouse = jest.fn(() =>
      mockPartial<MouseProviderInterface>({
        setMouseDelay: jest.fn(),
        setMousePosition: setPositionMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();

    // WHEN
    const result = await SUT.move(testPoint as unknown as Array<Point>);

    // THEN
    expect(setPositionMock).toHaveBeenCalledTimes(1);
    expect(setPositionMock).toHaveBeenCalledWith(testPoint);
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
        releaseButton: releaseButtonMock
      })
    );
    providerRegistryMock.getLogProvider = () => new NoopLogProvider();

    // WHEN
    const result = await SUT.drag(path);

    // THEN
    expect(pressButtonMock).toHaveBeenCalledWith(Button.LEFT);
    expect(setPositionMock).toHaveBeenCalledTimes(path.length);
    expect(releaseButtonMock).toHaveBeenCalledWith(Button.LEFT);
    expect(result).toBe(SUT);
  });

  describe("Mousebuttons", () => {
    it.each([
      [Button.LEFT, Button.LEFT],
      [Button.MIDDLE, Button.MIDDLE],
      [Button.RIGHT, Button.RIGHT]
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
            releaseButton: releaseButtonMock
          })
        );
        providerRegistryMock.getLogProvider = () => new NoopLogProvider();

        // WHEN
        const pressed = await SUT.pressButton(input);
        const released = await SUT.releaseButton(input);

        // THEN
        expect(pressButtonMock).toHaveBeenCalledWith(expected);
        expect(releaseButtonMock).toHaveBeenCalledWith(expected);
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
            pressButton: mouseMock
          })
        );
        providerRegistryMock.getLogProvider = () => new NoopLogProvider();

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
            releaseButton: mouseMock
          })
        );
        providerRegistryMock.getLogProvider = () => new NoopLogProvider();

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
        [Button.RIGHT, Button.RIGHT]
      ] as Array<[Button, Button]>)(
        "should click the respective button on the provider",
        async (input: Button, expected: Button) => {
          // GIVEN
          const SUT = new MouseClass(providerRegistryMock);
          const clickMock = jest.fn();
          providerRegistryMock.getMouse = jest.fn(() =>
            mockPartial<MouseProviderInterface>({
              setMouseDelay: jest.fn(),
              click: clickMock
            })
          );
          providerRegistryMock.getLogProvider = () => new NoopLogProvider();

          // WHEN
          await SUT.click(input);

          // THEN
          expect(clickMock).toHaveBeenCalledWith(expected);
        }
      );
    });

    describe("doubleClick", () => {
      it.each([
        [Button.LEFT, Button.LEFT],
        [Button.MIDDLE, Button.MIDDLE],
        [Button.RIGHT, Button.RIGHT]
      ] as Array<[Button, Button]>)(
        "should click the respective button on the provider",
        async (input: Button, expected: Button) => {
          // GIVEN
          const SUT = new MouseClass(providerRegistryMock);
          const clickMock = jest.fn();
          providerRegistryMock.getMouse = jest.fn(() =>
            mockPartial<MouseProviderInterface>({
              setMouseDelay: jest.fn(),
              doubleClick: clickMock
            })
          );
          providerRegistryMock.getLogProvider = () => new NoopLogProvider();

          // WHEN
          await SUT.doubleClick(input);

          // THEN
          expect(clickMock).toHaveBeenCalledWith(expected);
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
            click: clickMock
          })
        );
        providerRegistryMock.getLogProvider = () => new NoopLogProvider();

        // WHEN
        const result = await SUT.leftClick();

        // THEN
        expect(clickSpy).toHaveBeenCalledWith(Button.LEFT);
        expect(clickMock).toHaveBeenCalledWith(Button.LEFT);
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
            click: clickMock
          })
        );
        providerRegistryMock.getLogProvider = () => new NoopLogProvider();

        // WHEN
        const result = await SUT.rightClick();

        // THEN
        expect(clickSpy).toHaveBeenCalledWith(Button.RIGHT);
        expect(clickMock).toHaveBeenCalledWith(Button.RIGHT);
        expect(result).toBe(SUT);
      });
    });
  });
});
