import {Image} from "./image.class";
import {MatchRequest} from "./match-request.class";

describe("MatchRequest", () => {
    it("should default to multi-scale matching", () => {
        const SUT = new MatchRequest(
            new Image(
                100,
                100,
                new ArrayBuffer(0),
                3,
                "haystack_image"
            ),
            new Image(
                100,
                100,
                new ArrayBuffer(0),
                3,
                "needle_image"
            ),
            0.99);

        expect(SUT.searchMultipleScales).toBeTruthy();
    });
});
