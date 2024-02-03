import { AbortSignal } from "node-abort-controller";

export interface TimoutConfig {
  signal?: AbortSignal;
}

export function timeout<R>(
  updateIntervalMs: number,
  maxDurationMs: number,
  action: (...params: any) => Promise<R>,
  config?: TimoutConfig,
): Promise<R> {
  return new Promise<R>((resolve, reject) => {
    let interval: NodeJS.Timeout;
    let timerCleaned = false;
    let lastResult: R | null;
    let lastRejectionReason: any | null;

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
        lastResult = result;
        lastRejectionReason = null;
        cleanupTimer();
        resolve(result);
      }
    }

    function handleRejection(reason: any) {
      lastRejectionReason = reason;
      lastResult = null;
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
      let additionalInformation: string | undefined;
      if (lastResult == null && lastRejectionReason != null) {
        additionalInformation = `Last rejection reason was: ${lastRejectionReason}.`;
      } else if (lastResult == null && lastRejectionReason == null) {
        additionalInformation = `Didn't receive a result within timeout.`;
      }
      reject(
        `Action timed out after ${maxDurationMs} ms.${
          additionalInformation ? ` ${additionalInformation}` : ""
        }`,
      );
    }, maxDurationMs);

    executeInterval();
  });
}
