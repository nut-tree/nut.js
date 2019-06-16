import * as cv from "opencv4nodejs-prebuilt";

export const findEdges = async (image: cv.Mat): Promise<cv.Mat> => {
  const gray = await image.cvtColorAsync(cv.COLOR_BGR2GRAY);
  return gray.cannyAsync(50, 200);
};
