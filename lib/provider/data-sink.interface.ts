/**
 * A DataSink should provide methods to store data
 *
 * @interface DataSink
 */
export interface DataSink<PARAMETER_TYPE, RETURN_TYPE> {
  /**
   * store will store data to disk
   * @param parameters Required parameters
   */
  store(parameters: PARAMETER_TYPE): Promise<RETURN_TYPE>;
}
