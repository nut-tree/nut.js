export type LogFunction = (message: string, data?: {}) => void;
export type ErrorLogFunction = (error: Error, data?: {}) => void;

const logIdentifier = "[nut.js]";

export interface LogProviderInterface {
    trace: LogFunction;
    debug: LogFunction;
    info: LogFunction;
    warn: LogFunction;
    error: ErrorLogFunction;
}

export class ConsoleLogger implements LogProviderInterface {
  public trace(message: string, data?: {}) {
    console.trace(message, data);
  }
  public debug(message: string, data?: {}) {
    console.debug(message, data);
  }
  public info(message: string, data?: {}) {
    console.info(message, data);
  }
  public warn(message: string, data?: {}) {
    console.warn(message, data);
  }
  public error(message: Error, data?: {}) {
    console.error(message, data);
  }
}

const nonErrorLevels = ['info', 'warn', 'debug', 'trace'];
const errorLevels = ['error'];

type NonErrorLogger = Omit<LogProviderInterface, 'error'>;
type ErrorLogger = Pick<LogProviderInterface, 'error'>;

export function wrapLogger(originalLogger: LogProviderInterface): LogProviderInterface {
  for (const level of nonErrorLevels) {
    const originalMethod = originalLogger[level as keyof NonErrorLogger];
    originalLogger[level as keyof NonErrorLogger] = (message: string, data?: {}) => {
      const wrappedMessage = `${logIdentifier} - ${message}`;
      originalMethod(wrappedMessage, data);
    }
  }
  for (const level of errorLevels) {
    const originalMethod = originalLogger[level as keyof ErrorLogger];
    originalLogger[level as keyof ErrorLogger] = (message: Error, data?: {}) => {
      const wrappedMessage = `${logIdentifier} - ${message}`;
      message.message = wrappedMessage;
      originalMethod(message, data);
    }
  }

  return originalLogger;
}
