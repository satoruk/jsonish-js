import { JSONish, assertJSONish, isJSONish } from "./JSONish";

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
    new Date("2020-04-30T07:10:55.302Z"), //
    new TypeError(
      'Unknown property type(Date("Thu Apr 30 2020 16:10:55 GMT+0900 (GMT+09:00)"))',
    ),
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
