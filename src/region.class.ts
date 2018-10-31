export class Region {
    constructor(public left: number, public top: number, public width: number, public height: number) {
    }

    area() {
        return this.width * this.height;
    }

    toString() {
        return `(${this.left}, ${this.top}, ${this.left + this.width}, ${this.top + this.height})`;
    }
}
