import {
  TypedObject,
  assertTypedObject,
  createTypedObject,
  isTypedObject,
} from "./TypedObject";

import { JSONish } from "./JSONish";

describe("createTypedObject", () => {
  test("createTypedObject(%p) is %p", () => {
    type Sample = TypedObject<"Sample", string>;
    const result: Sample = createTypedObject("Sample", "sample value");
    expect(result).toEqual({
      t: "Sample",
      v: "sample value",
    });
  });
});

describe("assertTypedObject", () => {
  describe("valid", () => {
    const table: [JSONish][] = [[{ t: "a", v: "b" }], [{ t: "a", v: 1 }]];

    test.each(table)("assertTypedObject(%p)", (value) => {
      expect(() => assertTypedObject(value)).not.toThrowError(TypeError);
    });
  });

  describe("invalid", () => {
    const table: [JSONish, TypeError][] = [
      [
        null, //
        new TypeError("not TypedObject"),
      ],
      [
        "string", //
        new TypeError("not TypedObject"),
      ],
      [{ t: 1, v: "b" }, new TypeError("'t' should be a string type")],
      [
        { t: "a" }, // no _value
        new TypeError("'v' should be not undefined"),
      ],
      [{ t: "a", v: "b", f1: "c" }, new TypeError("Unknown property name: f1")],
      [
        { t: "a", v: "b", f1: "c", f2: "d" },
        new TypeError("Unknown property names: f1,f2"),
      ],
    ];

    test.each(table)("assertTypedObject(%p)", (value, expected) => {
      expect(() => assertTypedObject(value)).toThrowError(expected);
    });
  });
});

describe("isTypedObject", () => {
  const table: [JSONish, boolean][] = [
    [
      { t: "a", v: "b" }, // is valid
      true,
    ],
    [
      { t: "a", v: 1 }, // is valid
      true,
    ],
    [
      { t: 1, v: "b" }, // _type is invalid
      false,
    ],
    [
      { t: "a" }, // _value is invalid
      false,
    ],
    [
      { t: "a", v: "b", f1: "c" }, // f1 is invalid
      false,
    ],
    [
      { t: "a", v: "b", f1: "c", f2: "d" }, // f1 and f2 is invalid
      false,
    ],
  ];

  test.each(table)("isTypedObject(%p) is %p", (value, expected) => {
    expect(isTypedObject(value)).toBe(expected);
  });
});
