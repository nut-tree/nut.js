export class Point {
    constructor(public x: number, public y: number) {
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
