import { assertTypedObject, isTypedObject } from "./TypedObject";

import { JSONish } from "./JSONish";

describe("assertTypedObject", () => {
  describe("valid", () => {
    const table: [JSONish][] = [
      [{ _type: "a", _value: "b" }],
      [{ _type: "a", _value: 1 }],
    ];

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
      [
        { _type: 1, _value: "b" },
        new TypeError("'_type' should be a string type"),
      ],
      [
        { _type: "a" }, // no _value
        new TypeError("'_value' should be not undefined"),
      ],
      [
        { _type: "a", _value: "b", f1: "c" },
        new TypeError("Unknown property name: f1"),
      ],
      [
        { _type: "a", _value: "b", f1: "c", f2: "d" },
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
      { _type: "a", _value: "b" }, // is valid
      true,
    ],
    [
      { _type: "a", _value: 1 }, // is valid
      true,
    ],
    [
      { _type: 1, _value: "b" }, // _type is invalid
      false,
    ],
    [
      { _type: "a" }, // _value is invalid
      false,
    ],
    [
      { _type: "a", _value: "b", f1: "c" }, // f1 is invalid
      false,
    ],
    [
      { _type: "a", _value: "b", f1: "c", f2: "d" }, // f1 and f2 is invalid
      false,
    ],
  ];

  test.each(table)("isTypedObject(%p) is %p", (value, expected) => {
    expect(isTypedObject(value)).toBe(expected);
  });
});
