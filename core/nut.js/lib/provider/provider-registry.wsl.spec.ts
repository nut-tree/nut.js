const windows = { clipboard: {}, keyboard: {}, mouse: {}, screen: {}, window: {}, close: jest.fn() };
const createWindowsProviders = jest.fn(() => windows);
jest.mock("@nut-tree/libnut/dist/lib/wsl", () => ({ createWindowsProviders }), { virtual: true });
jest.mock("@nut-tree/libnut", () => ({
  DefaultKeyboardAction: jest.fn(), DefaultMouseAction: jest.fn(),
  DefaultScreenAction: jest.fn(), DefaultWindowAction: jest.fn()
}), { virtual: true });
jest.mock("@nut-tree/default-clipboard-provider", () => ({ default: jest.fn() }), { virtual: true });

describe("WSL default provider registration", () => {
  const environment = process.env;
  beforeEach(() => {
    process.env = { ...environment, WSL_DISTRO_NAME: "Ubuntu" };
    for (const name of Object.keys(process.env)) {
      if (name.startsWith("NUT_JS_DISABLE_")) delete process.env[name];
    }
    createWindowsProviders.mockClear();
  });
  afterEach(() => { process.env = environment; });

  function load() {
    let registry: any;
    jest.isolateModules(() => { registry = require("./provider-registry.class").default; });
    return registry;
  }

  it("registers all five Windows providers without loading Linux native defaults", () => {
    const registry = load();
    expect(registry.getClipboard()).toBe(windows.clipboard);
    expect(registry.getKeyboard()).toBe(windows.keyboard);
    expect(registry.getMouse()).toBe(windows.mouse);
    expect(registry.getScreen()).toBe(windows.screen);
    expect(registry.getWindow()).toBe(windows.window);
    expect(createWindowsProviders).toHaveBeenCalledTimes(1);
    expect(require("@nut-tree/libnut").DefaultMouseAction).not.toHaveBeenCalled();
  });

  it.each(["CLIPBOARD", "KEYBOARD", "MOUSE", "SCREEN", "WINDOW"])("respects disabling the %s default provider", name => {
    process.env[`NUT_JS_DISABLE_DEFAULT_${name}_PROVIDER`] = "1";
    const registry = load();
    const getter = `get${name[0]}${name.substring(1).toLowerCase()}`;
    expect(() => registry[getter]()).toThrow("No");
  });

  it("respects disabling all default providers", () => {
    process.env.NUT_JS_DISABLE_DEFAULT_PROVIDERS = "1";
    const registry = load();
    expect(createWindowsProviders).not.toHaveBeenCalled();
    expect(() => registry.getMouse()).toThrow("No MouseProvider");
  });

  it("allows explicit Linux desktop selection", () => {
    process.env.NUT_JS_DISABLE_WSL = "1";
    const registry = load();
    expect(createWindowsProviders).not.toHaveBeenCalled();
    expect(registry.getMouse()).not.toBe(windows.mouse);
  });
});
