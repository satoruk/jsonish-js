import { JSONish } from "./JSONish";
import { TypedObject } from "./TypedObject";
import { createUnknownPropertyTypeMessage } from "./utils";
import isArray from "lodash/isArray";
import { isPrimitive } from "./primitives";
import { isPrimitiveObject } from "./PrimitiveObject";
import isUndefined from "lodash/isUndefined";
import keys from "lodash/keys";

export function defaultReplace(
  value: any,
  key: string | number | null,
  _path: (string | number)[],
): any {
  if (isPrimitive(value)) return value;
  if (isUndefined(value) && (key == null || typeof key === "number")) {
    // root value or array's value to convert null value
    return null;
  }

  if (value instanceof Date) {
    const obj: TypedObject<"Date", string> = {
      _t: "Date",
      _v: value.toISOString(),
    };
    return obj;
  }

  return value;
}

export function toJSONish(
  value: any,
  replacer: (
    value: any,
    key: string | number | null,
    path: (string | number)[],
  ) => any = defaultReplace,
) {
  const convert = function (
    v: any,
    k: string | number | null,
    p: (string | number)[],
  ): JSONish {
    const result = replacer(v, k, p);
    if (isPrimitive(result)) {
      // primitives are immutable
      return result;
    }
    if (isArray(result)) {
      return result.map((v, i) => convert(v, i, p.concat(i)));
    }
    if (isPrimitiveObject(result)) {
      const v: any = {};
      for (const k of keys(result).sort()) {
        if (isUndefined(result[k])) {
          continue;
        }
        v[k] = convert(result[k], k, p.concat(k));
      }
      return v;
    }

    throw new TypeError(createUnknownPropertyTypeMessage(value, p));
  };

  return convert(value, null, []);
}
