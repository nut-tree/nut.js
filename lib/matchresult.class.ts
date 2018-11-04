import {Region} from "./region.class";

export class MatchResult {
    constructor(public readonly probability: number, public readonly location: Region) {
    }
}
