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
      _t: "Sample",
      _v: "sample value",
    });
  });
});

describe("assertTypedObject", () => {
  describe("valid", () => {
    const table: [JSONish][] = [[{ _t: "a", _v: "b" }], [{ _t: "a", _v: 1 }]];

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
      [{ _t: 1, _v: "b" }, new TypeError("'_t' should be a string type")],
      [
        { _t: "a" }, // no _value
        new TypeError("'_v' should be not undefined"),
      ],
      [
        { _t: "a", _v: "b", f1: "c" },
        new TypeError("Unknown property name: f1"),
      ],
      [
        { _t: "a", _v: "b", f1: "c", f2: "d" },
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
      { _t: "a", _v: "b" }, // is valid
      true,
    ],
    [
      { _t: "a", _v: 1 }, // is valid
      true,
    ],
    [
      { _t: 1, _v: "b" }, // _type is invalid
      false,
    ],
    [
      { _t: "a" }, // _value is invalid
      false,
    ],
    [
      { _t: "a", _v: "b", f1: "c" }, // f1 is invalid
      false,
    ],
    [
      { _t: "a", _v: "b", f1: "c", f2: "d" }, // f1 and f2 is invalid
      false,
    ],
  ];

  test.each(table)("isTypedObject(%p) is %p", (value, expected) => {
    expect(isTypedObject(value)).toBe(expected);
  });
});
