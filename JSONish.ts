import get from "lodash/get";
import isArray from "lodash/isArray";
import isBoolean from "lodash/isBoolean";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import keys from "lodash/keys";
import { isPrimitiveObject } from "./PrimitiveObject";
import { createUnknownPropertyTypeMessage } from "./utils";

export type JSONish =
  | boolean
  | null
  | number
  | string
  | JSONish[]
  | { [k: string]: JSONish };

export function isJSONish(o: any): o is JSONish {
  try {
    assertJSONish(o);
    return true;
  } catch (_e) {
    return false;
  }
}

export function assertJSONish(value: any): asserts value is JSONish {
  const assert = function (val: any, p: (string | number)[]) {
    if (isString(val) || isNumber(val) || isBoolean(val) || val === null) {
      return;
    }
    if (isArray(val)) {
      val.forEach((v, i) => assert(v, p.concat(i)));
      return;
    }
    if (isPrimitiveObject(val)) {
      for (const k of keys(val).sort()) {
        assert(get(val, k), p.concat(k));
      }
      return;
    }

    throw new TypeError(createUnknownPropertyTypeMessage(val, p));
  };

  assert(value, []);
}
