import {Region} from "./region.class";

export class LocationParameters {
    constructor(public searchRegion?: Region, public matchProbability?: number) { }
}
