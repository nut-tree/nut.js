import {Image} from "../image.class";
import {DataSink} from "./data-sink.interface";

export interface ImageWriterParameters {
    data: Image,
    path: string
}

export type ImageWriter = DataSink<ImageWriterParameters, void>;
