type Query =
  | {
      id: string;
      type: "text";
      by: {
        line: string | RegExp;
      };
    }
  | {
      id: string;
      type: "text";
      by: {
        word: string | RegExp;
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

export type WordQuery = Extract<TextQuery, { by: { word: string | RegExp } }>;
export type LineQuery = Extract<TextQuery, { by: { line: string | RegExp } }>;

export type WindowQuery = Extract<Query, { type: "window" }>;

export const isWordQuery = (possibleQuery: any): possibleQuery is WordQuery => {
  return possibleQuery?.type === "text" && possibleQuery?.by?.word != null;
};
export const isLineQuery = (possibleQuery: any): possibleQuery is LineQuery => {
  return possibleQuery?.type === "text" && possibleQuery?.by?.line != null;
};

export const isTextQuery = (possibleQuery: any): possibleQuery is TextQuery => {
  return possibleQuery?.type === "text";
};

export const isWindowQuery = (
  possibleQuery: any
): possibleQuery is WindowQuery => {
  return possibleQuery?.type === "window";
};
