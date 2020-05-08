import { defaultReplace, fromJSONish } from "./fromJSONish";

import { JSONish } from "./JSONish";
import isString from "lodash/isString";
import { isTypedObject } from "./TypedObject";

class Dummy {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}

describe("fromJSONish", () => {
  const tableValid: [any, any][] = [
    [
      1, //
      1,
    ],
    [
      {
        _t: "Date",
        _v: "2020-04-30T07:10:55.302Z",
      }, //
      new Date("2020-04-30T07:10:55.302Z"),
    ],
    [
      {
        _t: "Dummy",
        _v: "Dummy",
      }, //
      {
        _t: "Dummy",
        _v: "Dummy",
      },
    ],
    [
      ["a"], //
      ["a"],
    ],
    [
      [undefined], //
      [undefined],
    ],
    [
      { f1: "a", f2: undefined }, //
      { f1: "a", f2: undefined },
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

  const tableReplaceValid: [JSONish, any][] = [
    [
      {
        _t: "Date",
        _v: "2020-04-30T07:10:55.302Z",
      }, //
      new Date("2020-04-30T07:10:55.302Z"),
    ],
    [
      {
        _t: "Dummy",
        _v: "Dummy",
      }, //
      new Dummy("Dummy"),
    ],
  ];

  test.each(tableValid)("fromJSONish(%p) to %p", (value, expected) => {
    expect(fromJSONish(value)).toEqual(expected);
  });

  test.each(tableReplaceValid)(
    "fromJSONish(%p, custom) to %p",
    (value, expected) => {
      const custom = function (
        value: any,
        key: string | number | null,
        path: (string | number)[],
      ): any {
        if (isTypedObject(value)) {
          switch (value._t) {
            case "Dummy":
              if (!isString(value._v)) {
                throw new TypeError();
              }
              return new Dummy(value._v);
          }
        }

        return defaultReplace(value, key, path);
      };
      expect(fromJSONish(value, custom)).toEqual(expected);
    },
  );
});
