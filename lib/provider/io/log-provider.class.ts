import {ExternalLogger, LogLevel, LogProviderInterface} from "../log-provider.interface";

export class LogProvider implements LogProviderInterface {
    private _loggingInstance?: ExternalLogger;

    constructor(loggingInstance?: ExternalLogger) {
        this._loggingInstance = loggingInstance;
    }

    debug(message: string, data?: {}): void {
        this._loggingInstance?.debug(message, data);
    }

    error(error: Error, data?: {}): void {
        this._loggingInstance?.error(error, data);
    }

    info(message: string, data?: {}): void {
        this._loggingInstance?.info(message, data);
    }

    trace(message: string, data?: {}): void {
        this._loggingInstance?.trace(message, data);
    }

    warn(message: string, data?: {}): void {
        this._loggingInstance?.warn(message, data);
    }

    connectLogger(logger: ExternalLogger) {
        this._loggingInstance = logger;
    }

    log(level: LogLevel, message: string | Error, data?: {}) {
        switch (level) {
            case LogLevel.TRACE:
                if (typeof message === 'string') {
                    this.trace(message, data);
                }
                break;
            case LogLevel.DEBUG:
                if (typeof message === 'string') {
                    this.debug(message, data);
                }
                break;
            case LogLevel.INFO:
                if (typeof message === 'string') {
                    this.info(message, data);
                }
                break;
            case LogLevel.WARN:
                if (typeof message === 'string') {
                    this.warn(message, data);
                }
                break;
            case LogLevel.ERROR:
                if (message instanceof Error) {
                    this.error(message, data);
                }
                break;
        }
    }
}