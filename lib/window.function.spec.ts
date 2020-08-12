import {createWindowApi} from "./window.function";
import {NativeAdapter} from "./adapter/native.adapter.class";
import {Window} from "./window.class";

describe("WindowApi", () => {
    describe("getWindows", () => {
        it("should return a list of open Windows", async () => {
            // GIVEN
            const SUT = createWindowApi(new NativeAdapter());

            // WHEN
            const windows = await SUT.getWindows()

            // THEN
            windows.forEach(wnd => {
                expect(wnd).toEqual(expect.any(Window));
            });
        });
    });

    describe("getActiveWindow", () => {
        it("should return the a single Window which is currently active", async () => {
            // GIVEN
            const SUT = createWindowApi(new NativeAdapter());

            // WHEN
            const window = await SUT.getActiveWindow();

            // THEN
            expect(window).toEqual(expect.any(Window));
        });
    });
});