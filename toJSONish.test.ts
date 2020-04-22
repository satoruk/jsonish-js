import { defaultReplace, toJSONish } from "./toJSONish";

import { JSONish } from "./JSONish";

class Dummy {
  constructor() {}
}

describe("toJSONish", () => {
  const tableValid: [any, JSONish][] = [
    [
      1, //
      1,
    ],
    [
      new Date("2020-04-30T07:10:55.302Z"), //
      {
        _type: "Date",
        _value: "2020-04-30T07:10:55.302Z",
      },
    ],
    [
      ["a"], //
      ["a"],
    ],
    [
      [undefined], //
      [null],
    ],
    [
      { f1: "a", f2: undefined }, //
      { f1: "a" },
    ],
    [
      null, //
      null,
    ],
    [
      true, //
      true,
    ],
  ];
  const tableInvalid: [any][] = [
    [
      new Dummy(), //
    ],
  ];

  test.each(tableValid)("toJSONish(%p) to %p", (value, expected) => {
    expect(toJSONish(value)).toEqual(expected);
  });
  test.each(tableInvalid)("toJSONish(%p) to throw TypeError", (value) => {
    expect(() => toJSONish(value, defaultReplace)).toThrowError(TypeError);
  });
});
