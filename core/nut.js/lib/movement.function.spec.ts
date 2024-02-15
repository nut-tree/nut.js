import { createMovementApi } from "./movement.function";
import { mockPartial } from "sneer";
import { MouseProviderInterface, ProviderRegistry } from "@nut-tree/provider-interfaces";
import { Point } from "@nut-tree/shared";

beforeEach(() => {
  jest.clearAllMocks();
});

const lineHelperMock = {
  straightLine: jest.fn()
};

const currentPosition = new Point(500, 500);

const providerRegistryMock = mockPartial<ProviderRegistry>({
  getMouse(): MouseProviderInterface {
    return mockPartial<MouseProviderInterface>({
      currentMousePosition: () => Promise.resolve(currentPosition)
    });
  }
});

describe("MovementApi", () => {
  describe("Relative movement", () => {
    it("should move the cursor down starting from the current mouse position", async () => {
      // GIVEN
      const SUT = createMovementApi(providerRegistryMock, lineHelperMock);
      const step = 100;
      const targetPoint = new Point(
        currentPosition.x,
        currentPosition.y + step
      );

      // WHEN
      await SUT.down(step);

      // THEN
      expect(lineHelperMock.straightLine).toHaveBeenCalledTimes(1);
      expect(lineHelperMock.straightLine).toHaveBeenCalledWith(
        currentPosition,
        targetPoint
      );
    });

    it("should move the cursor up starting from the current mouse position", async () => {
      // GIVEN
      const SUT = createMovementApi(providerRegistryMock, lineHelperMock);
      const step = 100;
      const targetPoint = new Point(
        currentPosition.x,
        currentPosition.y - step
      );

      // WHEN
      await SUT.up(step);

      // THEN
      expect(lineHelperMock.straightLine).toHaveBeenCalledTimes(1);
      expect(lineHelperMock.straightLine).toHaveBeenCalledWith(
        currentPosition,
        targetPoint
      );
    });

    it("should move the cursor left starting from the current mouse position", async () => {
      // GIVEN
      const SUT = createMovementApi(providerRegistryMock, lineHelperMock);
      const step = 100;
      const targetPoint = new Point(
        currentPosition.x - step,
        currentPosition.y
      );

      // WHEN
      await SUT.left(step);

      // THEN
      expect(lineHelperMock.straightLine).toHaveBeenCalledTimes(1);
      expect(lineHelperMock.straightLine).toHaveBeenCalledWith(
        currentPosition,
        targetPoint
      );
    });

    it("should move the cursor right starting from the current mouse position", async () => {
      // GIVEN
      const SUT = createMovementApi(providerRegistryMock, lineHelperMock);
      const step = 100;
      const targetPoint = new Point(
        currentPosition.x + step,
        currentPosition.y
      );

      // WHEN
      await SUT.right(step);

      // THEN
      expect(lineHelperMock.straightLine).toHaveBeenCalledTimes(1);
      expect(lineHelperMock.straightLine).toHaveBeenCalledWith(
        currentPosition,
        targetPoint
      );
    });
  });

  describe("straightTo", () => {
    it("should throw on non-Point input", async () => {
      // GIVEN
      const api = createMovementApi(providerRegistryMock, lineHelperMock);

      // WHEN
      const SUT = () => api.straightTo({ foo: "bar" } as unknown as Point);

      // THEN
      await expect(SUT()).rejects.toThrowError(/straightTo requires a Point.*/);
    });

    it("should move the cursor straight to the target point starting from the current mouse position", async () => {
      // GIVEN
      const SUT = createMovementApi(providerRegistryMock, lineHelperMock);
      const step = 100;
      const targetPoint = new Point(
        currentPosition.x,
        currentPosition.y - step
      );

      // WHEN
      await SUT.straightTo(targetPoint);

      // THEN
      expect(lineHelperMock.straightLine).toHaveBeenCalledTimes(1);
      expect(lineHelperMock.straightLine).toHaveBeenCalledWith(
        currentPosition,
        targetPoint
      );
    });
  });
});
