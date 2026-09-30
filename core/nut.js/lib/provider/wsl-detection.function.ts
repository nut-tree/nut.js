import { release } from "os";

/** WSL can host Linux desktops too; callers can retain them explicitly. */
export function shouldUseWindowsHost(
  platform: NodeJS.Platform = process.platform,
  environment: NodeJS.ProcessEnv = process.env,
  kernelRelease: () => string = release
): boolean {
  if (platform !== "linux" || environment.NUT_JS_DISABLE_WSL) return false;
  return Boolean(environment.WSL_INTEROP || environment.WSL_DISTRO_NAME || /microsoft/i.test(kernelRelease()));
}
