export type FirstArgumentType<T> = T extends (
  first: infer ArgType,
  ...args: any[]
) => any
  ? ArgType
  : never;
