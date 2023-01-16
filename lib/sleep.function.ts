import providerRegistry from "./provider/provider-registry.class";

export const sleep = async (ms: number) => {
  providerRegistry.getLogProvider().debug(`Sleeping for ${ms / 1000} seconds`);
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};

export const busyWaitForNanoSeconds = (duration: number) => {
  return new Promise<void>((res) => {
    const start = process.hrtime.bigint();
    let isWaiting = true;
    while (isWaiting) {
      if (process.hrtime.bigint() - start > duration) {
        isWaiting = false;
      }
    }
    res();
  });
};
