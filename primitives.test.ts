import { assertPrimitive, isPrimitive } from "./primitives";

const tableValid: [any][] = [
  [1], //
  [null], //
  [true], //
];
const tableInvalid: [any][] = [
  [Number.NaN], //
  [new Date("2020-04-30T07:10:55.302Z")], //
  [new Object()], //
  [undefined], //
  [{ f1: "a" }], //
];

describe("isPrimitive", () => {
  test.each(tableValid)("isPrimitive(%p) is true", (value) => {
    expect(isPrimitive(value)).toBe(true);
  });
  test.each(tableInvalid)("isPrimitive(%p) is false", (value) => {
    expect(isPrimitive(value)).toBe(false);
  });
});

describe("assertPrimitive", () => {
  test.each(tableValid)(
    "assertPrimitive(%p) to not throw TypeError",
    (value) => {
      expect(() => assertPrimitive(value)).not.toThrowError(TypeError);
    },
  );
  test.each(tableInvalid)("assertPrimitive(%p) to throw TypeError", (value) => {
    expect(() => assertPrimitive(value)).toThrowError(TypeError);
  });
});
