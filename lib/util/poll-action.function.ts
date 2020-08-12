export function timeout<R>(updateIntervalMs: number, maxDurationMs: number, action: (...params: any) => Promise<R>): Promise<R> {
  return new Promise<R>((resolve, reject) => {
    let interval: NodeJS.Timeout;
    const maxTimeout = setTimeout(
      () => {
        clearTimeout(maxTimeout);
        if (interval) {
          clearTimeout(interval);
        }
        reject(`Action timed out after ${maxDurationMs} ms`);
      },
      maxDurationMs
    );
    const startInterval = () => {
      interval = setTimeout(function intervalFunc() {
        action().then((result) => {
          if (!result) {
            interval = setTimeout(intervalFunc, updateIntervalMs);
          } else {
            clearTimeout(maxTimeout);
            clearTimeout(interval);
            resolve(result);
          }
        }).catch(() => {
          interval = setTimeout(intervalFunc, updateIntervalMs);
        });
      }, updateIntervalMs);
    };

    action().then((result) => {
      if (!result) {
        startInterval();
      } else {
        clearTimeout(maxTimeout);
        resolve(result);
      }
    }).catch(() => {
      startInterval();
    });
  });
}
