import { shouldUseWindowsHost } from "./wsl-detection.function";

describe("WSL Windows host selection", () => {
  it.each([
    [{ WSL_INTEROP: "/run/WSL/1_interop" }, "ordinary-linux"],
    [{ WSL_DISTRO_NAME: "Ubuntu" }, "ordinary-linux"],
    [{}, "6.6.87.2-microsoft-standard-WSL2"],
    [{}, "4.4.0-Microsoft"]
  ])("detects WSL using environment or kernel evidence", (environment, kernel) => {
    expect(shouldUseWindowsHost("linux", environment, () => kernel)).toBe(true);
  });
  it("leaves native Linux, macOS and Windows unchanged", () => {
    expect(shouldUseWindowsHost("linux", {}, () => "6.8.0-generic")).toBe(false);
    expect(shouldUseWindowsHost("darwin", { WSL_DISTRO_NAME: "Ubuntu" })).toBe(false);
    expect(shouldUseWindowsHost("win32", { WSL_INTEROP: "inherited" })).toBe(false);
  });
  it("allows WSL users to retain Linux desktop providers", () => {
    expect(shouldUseWindowsHost("linux", { WSL_DISTRO_NAME: "Ubuntu", NUT_JS_DISABLE_WSL: "1" })).toBe(false);
  });
});
