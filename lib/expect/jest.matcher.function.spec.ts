import {Controller, Point, Region} from "../../index";
import {jestMatchers} from "./jest.matcher.function";

expect.extend(jestMatchers);
const control = new Controller();

describe(".toBeAt", () => {
    it("should succeed when cursor is at right position.", () => {
        const target = new Point(100, 100);
        control.mouse.setPosition(target);
        expect(control.mouse).toBeAt(target);
    });

    it("should fail when cursor is at wrong position.", () => {
        const target = new Point(100, 100);
        control.mouse.setPosition(target);
        expect(control.mouse).not.toBeAt(new Point(10, 10));
    });
});

describe(".toBeIn", () => {
    it("should succeed when cursor is within correct region.", () => {
        const targetPoint = new Point(100, 100);
        const targetRegion = new Region(0, 0, 200, 200);
        control.mouse.setPosition(targetPoint);
        expect(control.mouse).toBeIn(targetRegion);
    });

    it("should fail when cursor is outside of search region.", () => {
        const targetPoint = new Point(200, 200);
        const targetRegion = new Region(0, 0, 100, 100);
        control.mouse.setPosition(targetPoint);
        expect(control.mouse).not.toBeIn(targetRegion);
    });
});
