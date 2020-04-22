import { assertPrimitiveObject, isPrimitiveObject } from "./PrimitiveObject";

const tableValid: [any][] = [
  [new Object()], //
  [{ f1: "a" }], //
];
const tableInvalid: [any][] = [
  [1], //
  [new Date("2020-04-30T07:10:55.302Z")], //
  [null], //
  [true], //
  [undefined], //
];

describe("isPrimitiveObject", () => {
  test.each(tableValid)("isPrimitiveObject(%p) is true", (value) => {
    expect(isPrimitiveObject(value)).toBe(true);
  });
  test.each(tableInvalid)("isPrimitiveObject(%p) is false", (value) => {
    expect(isPrimitiveObject(value)).toBe(false);
  });
});

describe("assertPrimitiveObject", () => {
  test.each(tableValid)(
    "assertPrimitiveObject(%p) to not throw TypeError",
    (value) => {
      expect(() => assertPrimitiveObject(value)).not.toThrowError(TypeError);
    },
  );
  test.each(tableInvalid)(
    "assertPrimitiveObject(%p) to throw TypeError",
    (value) => {
      expect(() => assertPrimitiveObject(value)).toThrowError(TypeError);
    },
  );
});
