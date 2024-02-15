import {
  ConsoleLogLevel,
  ConsoleLogProvider,
} from "./console-log-provider.class";

const traceMock = jest.fn();
const debugMock = jest.fn();
const infoMock = jest.fn();
const warnMock = jest.fn();
const errorMock = jest.fn();

beforeAll(() => {
  global.console.trace = traceMock;
  global.console.debug = debugMock;
  global.console.info = infoMock;
  global.console.warn = warnMock;
  global.console.error = errorMock;
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("ConsoleLogProvider", () => {
  it.each([
    [
      ConsoleLogLevel.TRACE,
      [traceMock, debugMock, infoMock, warnMock, errorMock],
      [],
    ],
    [
      ConsoleLogLevel.DEBUG,
      [debugMock, infoMock, warnMock, errorMock],
      [traceMock],
    ],
    [
      ConsoleLogLevel.INFO,
      [infoMock, warnMock, errorMock],
      [traceMock, debugMock],
    ],
    [
      ConsoleLogLevel.WARN,
      [warnMock, errorMock],
      [traceMock, debugMock, infoMock],
    ],
    [
      ConsoleLogLevel.ERROR,
      [errorMock],
      [traceMock, debugMock, infoMock, warnMock],
    ],
  ])(
    `should respect configured log level`,
    (
      level: ConsoleLogLevel,
      validMocks: jest.Mock[],
      invalidMocks: jest.Mock[]
    ) => {
      // GIVEN
      const SUT = new ConsoleLogProvider({ logLevel: level });

      // WHEN
      SUT.trace("test");
      SUT.debug("test");
      SUT.info("test");
      SUT.warn("test");
      SUT.error(new Error("test"));

      // THEN
      for (const mock of validMocks) {
        expect(mock).toHaveBeenCalledTimes(1);
      }
      for (const mock of invalidMocks) {
        expect(mock).not.toBeCalled();
      }
    }
  );

  it.each([
    [ConsoleLogLevel.TRACE, traceMock],
    [ConsoleLogLevel.DEBUG, debugMock],
    [ConsoleLogLevel.INFO, infoMock],
    [ConsoleLogLevel.WARN, warnMock],
    [ConsoleLogLevel.ERROR, errorMock],
  ])(
    `should respect configured log level`,
    (level: ConsoleLogLevel, mock: jest.Mock) => {
      // GIVEN
      const SUT = new ConsoleLogProvider({ logLevel: level });

      // WHEN
      SUT.trace("test", { data: "test" });
      SUT.debug("test", { data: "test" });
      SUT.info("test", { data: "test" });
      SUT.warn("test", { data: "test" });
      SUT.error(new Error("test"), { data: "test" });

      // THEN
      expect(mock).toHaveBeenCalledTimes(1);
      if (level != ConsoleLogLevel.ERROR) {
        expect(mock).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
      } else {
        expect(mock).toHaveBeenCalledWith(expect.any(Error), expect.any(Object));
      }
    }
  );
});
