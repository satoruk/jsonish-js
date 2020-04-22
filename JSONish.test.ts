import { JSONish, assertJSONish, isJSONish } from "./JSONish";

class Dummy {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const tableValid: [JSONish][] = [
  [{ f1: "a" }], //
  [["a"]], //
];

const tableInvalid: [any, TypeError][] = [
  [
    undefined, //
    new TypeError("Unknown property type(undefined)"),
  ],
  [
    [undefined], //
    new TypeError("Unknown property type(undefined) at 0"),
  ],
  [
    new Dummy("dummy"), //
    TypeError('Unknown property type(Dummy("dummy"))'),
  ],
];

describe("isJSONish", () => {
  test.each(tableValid)("isJSONish(%p) is true", (value) => {
    expect(isJSONish(value)).toBe(true);
  });

  test.each(tableInvalid)("isJSONish(%p) is false", (value, expected) => {
    expect(isJSONish(value)).toBe(false);
  });
});

describe("assertJSONish", () => {
  test.each(tableValid)("assertJSONish(%p) is valid", (value) => {
    expect(() => assertJSONish(value)).not.toThrowError(TypeError);
  });
  test.each(tableInvalid)("assertJSONish(%p) is invalid", (value, expected) => {
    expect(() => assertJSONish(value)).toThrowError(expected);
  });
});
