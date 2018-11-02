export class MovementType {
    static linear(amountOfSteps: number, speedInPixelsPerSecond: number): number[] {
        const timeSteps = [];
        let stepDuration = Math.floor((1 / speedInPixelsPerSecond) * 1000);
        if (stepDuration < 0) {
            stepDuration = 1;
        }
        for (let idx = 0; idx < amountOfSteps; ++idx) {
            timeSteps.push(stepDuration);
        }
        return timeSteps;
    };
}
