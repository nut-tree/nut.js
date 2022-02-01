import libnut = require("@nut-tree/libnut");
import {Button} from "../../button.enum";
import {Point} from "../../point.class";
import MouseAction from "./libnut-mouse.class";

jest.mock("@nut-tree/libnut");

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
            expect(libnut.mouseClick).toBeCalledTimes(1);
            expect(libnut.mouseClick).toBeCalledWith("left");
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
            expect(libnut.mouseClick).toBeCalledTimes(1);
            expect(libnut.mouseClick).toBeCalledWith("middle");
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
            expect(libnut.mouseClick).toBeCalledTimes(1);
            expect(libnut.mouseClick).toBeCalledWith("right");
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
            expect(libnut.mouseToggle).toBeCalledTimes(1);
            expect(libnut.mouseToggle).toBeCalledWith("down", expect.any(String));
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

        it("should reject on invalid buttons", async () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN

            // THEN
            await expect(() => SUT.pressButton(46)).rejects.toBe("pressButton received invalid button. Button: 46");
        });
    });

    describe("releaseButton", () => {
        it("should forward pressButton call to libnut with state 'up'", () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN
            SUT.releaseButton(Button.LEFT);

            // THEN
            expect(libnut.mouseToggle).toBeCalledTimes(1);
            expect(libnut.mouseToggle).toBeCalledWith("up", expect.any(String));
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

        it("should reject on invalid buttons", async () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN

            // THEN
            await expect(() => SUT.releaseButton(46)).rejects.toBe("releaseButton received invalid button. Button: 46");
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
            expect(libnut.scrollMouse).toBeCalledTimes(1);
            expect(libnut.scrollMouse).toBeCalledWith(0, scrollAmount);
        });

        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new MouseAction();
            const error = "Test error";
            libnut.scrollMouse = jest.fn(() => {
                throw new Error(error);
            });

            // WHEN

            // THEN
            await expect(SUT.scrollUp(100)).rejects.toThrowError(error);
        });

        it("should reject on negative values", async () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN

            // THEN
            await expect(SUT.scrollUp(-100)).rejects.toBe("scrollUp received negative input: -100");
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
            expect(libnut.scrollMouse).toBeCalledTimes(1);
            expect(libnut.scrollMouse).toBeCalledWith(0, -scrollAmount);
        });

        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new MouseAction();
            const error = "Test error";
            libnut.scrollMouse = jest.fn(() => {
                throw new Error(error);
            });

            // WHEN

            // THEN
            await expect(SUT.scrollDown(100)).rejects.toThrowError(error);
        });

        it("should reject on negative values", async () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN

            // THEN
            await expect(SUT.scrollDown(-100)).rejects.toBe("scrollDown received negative input: -100");
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
            expect(libnut.scrollMouse).toBeCalledTimes(1);
            expect(libnut.scrollMouse).toBeCalledWith(-scrollAmount, 0);
        });

        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new MouseAction();
            const error = "Test error";
            libnut.scrollMouse = jest.fn(() => {
                throw new Error(error);
            });

            // WHEN

            // THEN
            await expect(SUT.scrollLeft(100)).rejects.toThrowError(error);
        });

        it("should reject on negative values", async () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN

            // THEN
            await expect(SUT.scrollLeft(-100)).rejects.toBe("scrollLeft received negative input: -100");
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
            expect(libnut.scrollMouse).toBeCalledTimes(1);
            expect(libnut.scrollMouse).toBeCalledWith(scrollAmount, 0);
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

        it("should reject on negative values", async () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN

            // THEN
            await expect(SUT.scrollRight(-100)).rejects.toBe("scrollRight received negative input: -100");
        });
    });

    describe("currentMousePosition", () => {
        it("should return the current mouse position via libnut", async () => {
            // GIVEN
            libnut.getMousePos = jest.fn(() => ({x: 10, y: 100}));
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
            expect(libnut.moveMouse).toBeCalledTimes(1);
            expect(libnut.moveMouse).toBeCalledWith(10, 100);
        });

        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new MouseAction();
            const error = "Test error";
            libnut.moveMouse = jest.fn(() => {
                throw new Error(error);
            });

            // WHEN

            // THEN
            await expect(SUT.setMousePosition(new Point(100, 100))).rejects.toThrowError(error);
        });

        it("should reject on invalid input", async () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN

            // THEN
            await expect(SUT.setMousePosition((undefined as any) as Point)).rejects.toBe("setMousePosition received invalid point: undefined");
        });

        it("should reject on incomplete input", async () => {
            // GIVEN
            const SUT = new MouseAction();

            // WHEN

            // THEN
            await expect(SUT.setMousePosition(({x: 100} as any) as Point)).rejects.toBe("setMousePosition received invalid point: {\"x\":100}");
        });
    });
});
