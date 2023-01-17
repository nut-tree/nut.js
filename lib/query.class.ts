type Query =
  | {
      id: string;
      type: "text";
      by: {
        line: string;
      };
    }
  | {
      id: string;
      type: "text";
      by: {
        word: string;
      };
    }
  | {
      id: string;
      type: "window";
      by: {
        title: string | RegExp;
      };
    };

export type TextQuery = Extract<Query, { type: "text" }>;

/**
 * A word query is a text query that searches for a single word on screen.
 * It will be processed by an {@link TextFinderInterface} instance.
 */
export type WordQuery = Extract<TextQuery, { by: { word: string } }>;

/**
 * A word query is a text query that searches for a single text line on screen.
 * It will be processed by an {@link TextFinderInterface} instance.
 */
export type LineQuery = Extract<TextQuery, { by: { line: string } }>;

/**
 * A window query is a query that searches for a window on screen.
 * It will be processed by an {@link WindowFinderInterface} instance.
 */
export type WindowQuery = Extract<Query, { type: "window" }>;

/**
 * Type guard for {@link WordQuery}
 * @param possibleQuery A possible word query
 */
export const isWordQuery = (possibleQuery: any): possibleQuery is WordQuery => {
  return possibleQuery?.type === "text" && possibleQuery?.by?.word != null;
};

/**
 * Type guard for {@link LineQuery}
 * @param possibleQuery A possible line query
 */
export const isLineQuery = (possibleQuery: any): possibleQuery is LineQuery => {
  return possibleQuery?.type === "text" && possibleQuery?.by?.line != null;
};

/**
 * Type guard for {@link TextQuery}
 * @param possibleQuery A possible line or word query
 */
export const isTextQuery = (possibleQuery: any): possibleQuery is TextQuery => {
  return possibleQuery?.type === "text";
};

/**
 * Type guard for {@link WindowQuery}
 * @param possibleQuery A possible window query
 */
export const isWindowQuery = (
  possibleQuery: any
): possibleQuery is WindowQuery => {
  return possibleQuery?.type === "window";
};
