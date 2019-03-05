import { sleep } from "./sleep.function";

describe("sleep", () => {
  it("should resolve after x ms", async () => {
    // GIVEN
    const timeout = 500;

    // WHEN
    const before = Date.now();
    await sleep(timeout);
    const after = Date.now();

    // THEN
    expect(after - before).toBeGreaterThanOrEqual(timeout);
  });
});
