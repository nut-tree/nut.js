import * as cv from "opencv4nodejs-prebuilt";

export const scaleImage = async (image: cv.Mat, scaleFactor: number): Promise<cv.Mat> => {
  const minScaleFactor = (scaleFactor <= 0.0) ? 1.0 : scaleFactor;
  const scaledRows = Math.floor(image.rows * minScaleFactor);
  const scaledCols = Math.floor(image.cols * minScaleFactor);
  return image.resizeAsync(scaledRows, scaledCols, 0, 0, cv.INTER_AREA);
};
