export class Config {
    public matchProbability = 0.99;
    public mouseSpeed = 1000; // Mouse speed in pixel/second

    constructor(params = {
        matchProbability: 0.99,
        mouseSpeed: 1000,
    }) {
        this.matchProbability = params.matchProbability;
        this.mouseSpeed = params.mouseSpeed;
    }
}
