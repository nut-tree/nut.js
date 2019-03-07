/**
 * A DataSink should provide methods to store data
 *
 * @interface DataSink
 */
export interface DataSink {
  /**
   * store will write data to disk
   * @param data Data to write
   * @param path Absolute output file path
   */
  store(data: any, path: string): Promise<any>;
}
