import {Region} from "./region.class";

export class MatchResult {
    constructor(readonly probability: number, readonly location: Region) {
    }
}
