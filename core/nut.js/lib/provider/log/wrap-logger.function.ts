import { LogProviderInterface } from "@nut-tree/provider-interfaces";

const logIdentifier = "[nut.js]";
const nonErrorLevels = ["info", "warn", "debug", "trace"];
const errorLevels = ["error"];
type NonErrorLogger = Omit<LogProviderInterface, "error">;
type ErrorLogger = Pick<LogProviderInterface, "error">;

export function wrapLogger(originalLogger: LogProviderInterface): LogProviderInterface {
  for (const level of nonErrorLevels) {
    const originalMethod = originalLogger[level as keyof NonErrorLogger];
    originalLogger[level as keyof NonErrorLogger] = (message: string, data?: {}) => {
      const wrappedMessage = `${logIdentifier} - ${message}`;
      originalMethod(wrappedMessage, data);
    };
  }
  for (const level of errorLevels) {
    const originalMethod = originalLogger[level as keyof ErrorLogger];
    originalLogger[level as keyof ErrorLogger] = (message: Error, data?: {}) => {
      message.message = `${logIdentifier} - ${message}`;
      originalMethod(message, data);
    };
  }

  return originalLogger;
}