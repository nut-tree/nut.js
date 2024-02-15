export type LogFunction = (message: string, data?: {}) => void;
export type ErrorLogFunction = (error: Error, data?: {}) => void;

export interface LogProviderInterface {
  trace: LogFunction;
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: ErrorLogFunction;
}

