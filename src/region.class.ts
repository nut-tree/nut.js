export class Region {
    constructor(public left: number, public top: number, public width: number, public height: number) {
    }

    public area() {
        return this.width * this.height;
    }

    public toString() {
        return `(${this.left}, ${this.top}, ${this.left + this.width}, ${this.top + this.height})`;
    }
}
