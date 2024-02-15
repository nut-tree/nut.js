import { LogProviderInterface } from "@nut-tree/provider-interfaces";

export enum ConsoleLogLevel {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export interface ConsoleLogProviderConfig {
  logLevel?: ConsoleLogLevel;
  withTimeStamp?: boolean;
}

const defaultConfig: ConsoleLogProviderConfig = {
  logLevel: ConsoleLogLevel.INFO,
  withTimeStamp: true
};

export class ConsoleLogProvider implements LogProviderInterface {
  private readonly logLevel: ConsoleLogLevel;
  private readonly withTimeStamp: boolean;

  constructor(config: ConsoleLogProviderConfig = defaultConfig) {
    this.trace = this.trace.bind(this);
    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this.logLevel = config.logLevel ?? ConsoleLogLevel.INFO;
    this.withTimeStamp = config.withTimeStamp ?? true;
  }

  private log(logLevel: ConsoleLogLevel, message: string | Error, data?: {}) {
    if (logLevel >= this.logLevel) {
      const timeStampPrefix = `${new Date().toISOString()} - `;
      const extendedMessage = `${
        this.withTimeStamp == null || this.withTimeStamp ? timeStampPrefix : ""
      }${ConsoleLogLevel[logLevel]} - ${
        message instanceof Error ? message.message : message
      }`;
      switch (logLevel) {
        case ConsoleLogLevel.TRACE:
          if (data) {
            console.trace(extendedMessage, data);
          } else {
            console.trace(extendedMessage);
          }
          break;
        case ConsoleLogLevel.DEBUG:
          if (data) {
            console.debug(extendedMessage, data);
          } else {
            console.debug(extendedMessage);
          }
          break;
        case ConsoleLogLevel.INFO:
          if (data) {
            console.info(extendedMessage, data);
          } else {
            console.info(extendedMessage);
          }
          break;
        case ConsoleLogLevel.WARN:
          if (data) {
            console.warn(extendedMessage, data);
          } else {
            console.warn(extendedMessage);
          }
          break;
        case ConsoleLogLevel.ERROR:
          (message as Error).message = extendedMessage;
          if (data) {
            console.error(message, data);
          } else {
            console.error(message);
          }
          break;
      }
    }
  }

  public trace(message: string, data?: {}) {
    this.log(ConsoleLogLevel.TRACE, message, data);
  }

  public debug(message: string, data?: {}) {
    this.log(ConsoleLogLevel.DEBUG, message, data);
  }

  public info(message: string, data?: {}) {
    this.log(ConsoleLogLevel.INFO, message, data);
  }

  public warn(message: string, data?: {}) {
    this.log(ConsoleLogLevel.WARN, message, data);
  }

  public error(message: Error, data?: {}) {
    this.log(ConsoleLogLevel.ERROR, message, data);
  }
}
