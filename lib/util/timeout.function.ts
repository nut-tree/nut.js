import { AbortSignal } from "node-abort-controller";

export interface TimoutConfig {
  signal?: AbortSignal;
}

export function timeout<R>(
  updateIntervalMs: number,
  maxDurationMs: number,
  action: (...params: any) => Promise<R>,
  config?: TimoutConfig
): Promise<R> {
  return new Promise<R>((resolve, reject) => {
    let interval: NodeJS.Timeout;
    let timerCleaned = false;

    if (config?.signal) {
      config.signal.onabort = () => {
        cleanupTimer();
        reject(`Action aborted by signal`);
      };
    }

    function executeInterval() {
      action().then(validateResult).catch(handleRejection);
    }

    function validateResult(result: R) {
      if (!result && !timerCleaned) {
        interval = setTimeout(executeInterval, updateIntervalMs);
      } else {
        cleanupTimer();
        resolve(result);
      }
    }

    function handleRejection() {
      if (!timerCleaned) {
        interval = setTimeout(executeInterval, updateIntervalMs);
      }
    }

    function cleanupTimer() {
      timerCleaned = true;
      if (maxTimeout) {
        clearTimeout(maxTimeout);
      }
      if (interval) {
        clearTimeout(interval);
      }
    }

    const maxTimeout = setTimeout(() => {
      cleanupTimer();
      reject(`Action timed out after ${maxDurationMs} ms`);
    }, maxDurationMs);

    executeInterval();
  });
}
