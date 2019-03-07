import { join, parse } from "path";
import { cwd } from "process";
import { FileType } from "./file-type.enum";

export const generateOutputPath = (
  filename: string,
  params?: {
    type?: FileType,
    path?: string,
    prefix?: string,
    postfix?: string
  }
) => {
  const name = parse(filename).name;
  const imageType = (params && params.type) ? params.type : FileType.PNG;
  const path = (params && params.path) ? params.path : cwd();
  const prefix = (params && params.prefix) ? params.prefix : "";
  const postfix = (params && params.postfix) ? params.postfix : "";
  return join(path, `${prefix}${name}${postfix}${imageType}`);
};
