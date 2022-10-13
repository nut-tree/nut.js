import {setTimeout as setTimeoutPromise} from "timers/promises";

export const sleep = async (ms: number, signal?: AbortSignal) => {
  const options = {signal: {aborted: false}};
  if (signal) options.signal = signal;
  return setTimeoutPromise(ms, true, options).catch(err => {
    if (err.name ==='AbortError') {
      return Promise.resolve(true);
    }
    return Promise.reject(err);
  });
};

export const busyWaitForNanoSeconds = (duration: number) => {
  return new Promise<void>(res => {
    const start = process.hrtime.bigint();
    let isWaiting = true;
    while (isWaiting) {
      if ((process.hrtime.bigint() - start) > duration) {
        isWaiting = false;
      }
    }
    res();
  });
};
