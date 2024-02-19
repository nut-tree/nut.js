import { join, parse } from "path";
import { cwd } from "process";
import { FileType } from "@nut-tree/shared";

/**
 * {@link generateOutputPath} is used to assemble full file path from a filename and various parameters
 * @param filename The base filename
 * @param params A config object which allows to configure {@link FileType}, base path, filename prefix and filename postfix
 */
export const generateOutputPath = (
  filename: string,
  params?: {
    type?: FileType;
    path?: string;
    prefix?: string;
    postfix?: string;
  }
) => {
  const name = parse(filename).name;
  const imageType = params?.type ? params.type : FileType.PNG;
  const path = params?.path ? params.path : cwd();
  const prefix = params?.prefix ? params.prefix : "";
  const postfix = params?.postfix ? params.postfix : "";
  return join(path, `${prefix}${name}${postfix}${imageType}`);
};
