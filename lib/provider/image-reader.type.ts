import { DataSourceInterface } from "./data-source.interface";
import { Image } from "../image.class";

export type ImageReader = DataSourceInterface<string, Image>;
