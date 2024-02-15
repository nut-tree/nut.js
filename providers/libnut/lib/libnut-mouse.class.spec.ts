import {libnut} from "../import_libnut";
import {Button, Point} from "@nut-tree/shared";
import MouseAction from "./libnut-mouse.class";

jest.mock("../import_libnut");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("libnut mouse action", () => {
  describe("leftClick", () => {
    it("should forward leftClick call to libnut", () => {
      // GIVEN
      const SUT = new MouseAction();

      // WHEN
      SUT.leftClick();

      // THEN
      expect(libnut.mouseClick).toHaveBeenCalledTimes(1);
      expect(libnut.mouseClick).toHaveBeenCalledWith("left");
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.mouseClick = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.leftClick()).rejects.toThrowError(error);
    });
  });

  describe("middleClick", () => {
    it("should forward middleClick call to libnut", () => {
      // GIVEN
      const SUT = new MouseAction();

      // WHEN
      SUT.middleClick();

      // THEN
      expect(libnut.mouseClick).toHaveBeenCalledTimes(1);
      expect(libnut.mouseClick).toHaveBeenCalledWith("middle");
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.mouseClick = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.middleClick()).rejects.toThrowError(error);
    });
  });

  describe("rightClick", () => {
    it("should forward rightClick call to libnut", () => {
      // GIVEN
      const SUT = new MouseAction();

      // WHEN
      SUT.rightClick();

      // THEN
      expect(libnut.mouseClick).toHaveBeenCalledTimes(1);
      expect(libnut.mouseClick).toHaveBeenCalledWith("right");
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.mouseClick = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.rightClick()).rejects.toThrowError(error);
    });
  });

  describe("pressButton", () => {
    it("should forward pressButton call to libnut with state 'down'", () => {
      // GIVEN
      const SUT = new MouseAction();

      // WHEN
      SUT.pressButton(Button.LEFT);

      // THEN
      expect(libnut.mouseToggle).toHaveBeenCalledTimes(1);
      expect(libnut.mouseToggle).toHaveBeenCalledWith("down", expect.any(String));
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.mouseToggle = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.pressButton(Button.LEFT)).rejects.toThrowError(error);
    });
  });

  describe("releaseButton", () => {
    it("should forward pressButton call to libnut with state 'up'", () => {
      // GIVEN
      const SUT = new MouseAction();

      // WHEN
      SUT.releaseButton(Button.LEFT);

      // THEN
      expect(libnut.mouseToggle).toHaveBeenCalledTimes(1);
      expect(libnut.mouseToggle).toHaveBeenCalledWith("up", expect.any(String));
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.mouseToggle = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.releaseButton(Button.LEFT)).rejects.toThrowError(error);
    });
  });

  describe("scrollUp", () => {
    it("should forward scrollUp call to libnut with positive y value", () => {
      // GIVEN
      const SUT = new MouseAction();
      const scrollAmount = 5;

      // WHEN
      SUT.scrollUp(scrollAmount);

      // THEN
      expect(libnut.scrollMouse).toHaveBeenCalledTimes(1);
      expect(libnut.scrollMouse).toHaveBeenCalledWith(0, scrollAmount);
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.scrollMouse = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.scrollUp(100)).rejects.toThrowError(error);
    });
  });

  describe("scrollDown", () => {
    it("should forward scrollDown call to libnut with negative y value", () => {
      // GIVEN
      const SUT = new MouseAction();
      const scrollAmount = 5;

      // WHEN
      SUT.scrollDown(scrollAmount);

      // THEN
      expect(libnut.scrollMouse).toHaveBeenCalledTimes(1);
      expect(libnut.scrollMouse).toHaveBeenCalledWith(0, -scrollAmount);
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.scrollMouse = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.scrollDown(100)).rejects.toThrowError(error);
    });
  });

  describe("scrollLeft", () => {
    it("should forward scrollLeft call to libnut with negative x value", () => {
      // GIVEN
      const SUT = new MouseAction();
      const scrollAmount = 5;

      // WHEN
      SUT.scrollLeft(scrollAmount);

      // THEN
      expect(libnut.scrollMouse).toHaveBeenCalledTimes(1);
      expect(libnut.scrollMouse).toHaveBeenCalledWith(-scrollAmount, 0);
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.scrollMouse = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.scrollLeft(100)).rejects.toThrowError(error);
    });
  });

  describe("scrollRight", () => {
    it("should forward scrollRight call to libnut with negative x value", () => {
      // GIVEN
      const SUT = new MouseAction();
      const scrollAmount = 5;

      // WHEN
      SUT.scrollRight(scrollAmount);

      // THEN
      expect(libnut.scrollMouse).toHaveBeenCalledTimes(1);
      expect(libnut.scrollMouse).toHaveBeenCalledWith(scrollAmount, 0);
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.scrollMouse = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.scrollRight(100)).rejects.toThrowError(error);
    });
  });

  describe("currentMousePosition", () => {
    it("should return the current mouse position via libnut", async () => {
      // GIVEN
      libnut.getMousePos = jest.fn(() => ({ x: 10, y: 100 }));
      const SUT = new MouseAction();

      // WHEN
      const currentPosition = await SUT.currentMousePosition();

      // THEN
      expect(currentPosition.x).toEqual(10);
      expect(currentPosition.y).toEqual(100);
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.getMousePos = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.currentMousePosition()).rejects.toThrowError(error);
    });
  });

  describe("setMousePosition", () => {
    it("should set the current mouse position via libnut", () => {
      // GIVEN
      const SUT = new MouseAction();

      // WHEN
      SUT.setMousePosition(new Point(10, 100));

      // THEN
      expect(libnut.moveMouse).toHaveBeenCalledTimes(1);
      expect(libnut.moveMouse).toHaveBeenCalledWith(10, 100);
    });

    it("should reject on libnut errors", () => {
      // GIVEN
      const SUT = new MouseAction();
      const error = "Test error";
      libnut.moveMouse = jest.fn(() => {
        throw new Error(error);
      });

      // WHEN

      // THEN
      expect(SUT.setMousePosition(new Point(100, 100))).rejects.toThrowError(
        error
      );
    });
  });
});
