import { ColorQuery, isColorQuery, isTextQuery, isWindowQuery, TextQuery, WindowQuery } from "./query.class";
import { Image, isImage } from "./image.class";
import { RGBA } from "./rgba.class";

const dummyImage = new Image(0, 0, Buffer.of(0), 3, "foo", 0, 0);

describe("query types", () => {
  it.each<[TextQuery, boolean]>([
    [
      {
        id: "dummy",
        type: "text",
        by: {
          word: "dummy-query"
        }
      },
      true
    ],
    [
      {
        id: "dummy",
        type: "text",
        by: {
          line: "dummy-query"
        }
      },
      true
    ],
    [
      {
        id: "dummy",
        type: "foo",
        by: {
          line: "dummy-query"
        }
      } as unknown as TextQuery,
      false
    ]
  ])(
    "should correctly identify text queries",
    (query: TextQuery, expected: boolean) => {
      // GIVEN

      // WHEN
      const result = isTextQuery(query);

      // THEN
      expect(result).toBe(expected);
    }
  );

  it.each<[ColorQuery, boolean]>([
    [
      {
        id: "dummy",
        type: "color",
        by: {
          color: new RGBA(0, 0, 0, 0)
        }
      },
      true
    ],
    [
      {
        id: "dummy",
        type: "foo",
        by: {
          line: "dummy-query"
        }
      } as unknown as ColorQuery,
      false
    ]
  ])(
    "should correctly identify text queries",
    (query: ColorQuery, expected: boolean) => {
      // GIVEN

      // WHEN
      const result = isColorQuery(query);

      // THEN
      expect(result).toBe(expected);
    }
  );

  it.each<[WindowQuery, boolean]>([
    [
      {
        id: "dummy",
        type: "window",
        by: {
          title: "dummy-query"
        }
      },
      true
    ],
    [
      {
        id: "dummy",
        type: "foo",
        by: {
          title: "dummy-query"
        }
      } as unknown as WindowQuery,
      false
    ]
  ])(
    "should correctly identify window queries",
    (query: WindowQuery, expected: boolean) => {
      // GIVEN

      // WHEN
      const result = isWindowQuery(query);

      // THEN
      expect(result).toBe(expected);
    }
  );

  it.each<[Image, boolean]>([
    [dummyImage, true],
    [
      {
        id: "dummy",
        type: "foo",
        by: {
          title: "dummy-query"
        }
      } as unknown as Image,
      false
    ]
  ])(
    "should correctly identify image queries",
    (query: Image, expected: boolean) => {
      // GIVEN

      // WHEN
      const result = isImage(query);

      // THEN
      expect(result).toBe(expected);
    }
  );
});
