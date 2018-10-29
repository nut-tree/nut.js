'use strict';

class Region {
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }

    toString() {
        return `(${this.left}, ${this.top}, ${this.left + this.width}, ${this.top + this.height})`;
    }
}

module.exports = Region;
