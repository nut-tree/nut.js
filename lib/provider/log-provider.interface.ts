export type LogFunction = (message: string, data?: {}) => void;
export type ErrorLogFunction = (error: Error, data?: {}) => void;

export enum LogLevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR
}

export interface ConsoleLogger {
    trace(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

export type ExternalLogger = ConsoleLogger;

/**
 * LogProviderInterface to implement when adding a new logging provider for internal use
 *
 * ATTENTION: Please keep in mind that none of the trace, debug, info, warn or error should cause runtime errors.
 *            Logging should default to a no-op in case it's not properly set up
 */
export interface LogProviderInterface {
    trace: LogFunction;
    debug: LogFunction;
    info: LogFunction;
    warn: LogFunction;
    error: ErrorLogFunction;

    /**
     * connectLogger is meant to wire up an {@link ExternalLogger} to the internal logging provider
     * @param logger The {@link ExternalLogger} to connect
     */
    connectLogger(logger: ExternalLogger): void;

    log(level: LogLevel, message: string, data?: {}): void;
}