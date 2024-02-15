import { timeout } from "./timeout.function";
import {AbortController} from "node-abort-controller";
import { sleep } from "../sleep.function";

describe("timeout", () => {
  it("should timeout after maxDuration if action rejects", async () => {
    // GIVEN
    const updateInterval = 200;
    const maxDuration = 1000;
    const action = jest.fn(() => {
      return Promise.reject(false);
    });

    // WHEN
    const start = Date.now();
    try {
      await timeout(updateInterval, maxDuration, action);
    } catch (e) {
      expect(e).toBe(
        `Action timed out after ${maxDuration} ms. Last rejection reason was: false.`
      );
    }
    const end = Date.now();

    // THEN
    expect(end - start).toBeGreaterThanOrEqual(maxDuration);
  });

  it("should timeout after maxDuration if action resolve != true", async () => {
    // GIVEN
    const updateInterval = 200;
    const maxDuration = 1000;
    const action = jest.fn(async () => {
      return false;
    });

    // WHEN
    const start = Date.now();
    try {
      await timeout(updateInterval, maxDuration, action);
    } catch (e) {
      expect(e).toEqual(
        `Action timed out after ${maxDuration} ms. Didn't receive a result within timeout.`
      );
    }
    const end = Date.now();

    // THEN
    expect(end - start).toBeGreaterThanOrEqual(maxDuration);
  });

  it("should resolve after updateInterval if action resolves", async () => {
    // GIVEN
    const updateInterval = 200;
    const maxDuration = 1000;
    const action = jest.fn(() => {
      return Promise.resolve(true);
    });

    // WHEN
    const start = Date.now();
    await timeout(updateInterval, maxDuration, action);
    const end = Date.now();

    // THEN
    expect(end - start).toBeLessThan(updateInterval);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it("should resolve after updateInterval if action resolves != true", async () => {
    // GIVEN
    const updateInterval = 200;
    const maxDuration = 1000;
    const action = jest.fn(async () => {
      return true;
    });

    // WHEN
    const start = Date.now();
    await timeout(updateInterval, maxDuration, action);
    const end = Date.now();

    // THEN
    expect(end - start).toBeLessThan(updateInterval);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it("should retry until action succeeds", async () => {
    // GIVEN
    const updateInterval = 200;
    const maxDuration = 1000;
    const delay = 2.5 * updateInterval;
    const start = Date.now();
    const action = jest.fn(() => {
      const interval = Date.now() - start;
      return new Promise<boolean>((resolve, reject) =>
        interval > delay ? resolve(true) : reject()
      );
    });

    // WHEN
    const result = await timeout(updateInterval, maxDuration, action);
    const end = Date.now();

    // THEN
    expect(end - start).toBeGreaterThanOrEqual(delay);
    expect(result).toBeTruthy();
  });

  it("should fail after timeout if timeout < retry interval", async () => {
    // GIVEN
    const updateInterval = 1000;
    const maxDuration = 200;
    const action = jest.fn(() => Promise.resolve(false));

    // WHEN
    const start = Date.now();
    try {
      await timeout(updateInterval, maxDuration, action);
    } catch (e) {
      expect(e).toEqual(
        `Action timed out after ${maxDuration} ms. Didn't receive a result within timeout.`
      );
    }
    const end = Date.now();

    // THEN
    expect(action).toHaveBeenCalledTimes(1);
    expect(end - start).toBeLessThan(updateInterval);
  });

  it("should fail if action does not resolve within timeout", async () => {
    // GIVEN
    const updateInterval = 100;
    const maxDuration = 200;
    const action = jest.fn(() => {
      return new Promise((_, reject) => {
        setTimeout(() => reject(), 300);
      });
    });

    // WHEN
    const SUT = () => timeout(updateInterval, maxDuration, action);

    // THEN
    await expect(SUT).rejects.toBe(
      `Action timed out after ${maxDuration} ms. Didn't receive a result within timeout.`
    );
    expect(action).toHaveBeenCalledTimes(1);
  });

  it("should fail after timeout if no result is returned from long running action", async () => {
    // GIVEN
    const updateInterval = 100;
    const maxDuration = 200;
    const action = jest.fn(() => {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(undefined as unknown as boolean);
        }, 210);
      });
    });

    // WHEN
    const SUT = () => timeout(updateInterval, maxDuration, action);

    // THEN
    await expect(SUT).rejects.toBe(
      `Action timed out after ${maxDuration} ms. Didn't receive a result within timeout.`
    );
    expect(action).toHaveBeenCalledTimes(1);
    await sleep(500);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it("should be externally abortable", async () => {
    // GIVEN
    const controller = new AbortController();
    const signal = controller.signal;
    const updateInterval = 100;
    const maxDuration = 3000;
    const action = jest.fn(() => {
      return new Promise<boolean>((_, reject) => {
        setTimeout(() => {
          reject(undefined as unknown as boolean);
        }, 20);
      });
    });

    // WHEN
    const SUT = timeout(updateInterval, maxDuration, action, { signal });
    setTimeout(() => controller.abort(), 1000);

    // THEN
    await expect(SUT).rejects.toBe(`Action aborted by signal`);
  });
});
