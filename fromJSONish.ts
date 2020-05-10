import { JSONish } from "./JSONish";
import clone from "lodash/clone";
import isArray from "lodash/isArray";
import { isPrimitive } from "./primitives";
import { isPrimitiveObject } from "./PrimitiveObject";
import { isTypedObject } from "./TypedObject";
import isUndefined from "lodash/isUndefined";
import keys from "lodash/keys";

export function defaultReplace(
  value: any,
  _key: string | number | null,
  _path: (string | number)[],
): any {
  if (isPrimitive(value)) return value;

  if (isTypedObject(value)) {
    switch (value.t) {
      case "Date":
        return new Date(value.v);
    }
  }

  return value;
}

export function fromJSONish(
  value: JSONish,
  replacer: (
    value: JSONish,
    key: string | number | null,
    path: (string | number)[],
  ) => any = defaultReplace,
) {
  const convert = function (
    v: JSONish,
    k: string | number | null,
    p: (string | number)[],
  ): any {
    const result = replacer(v, k, p);
    if (isPrimitive(result)) {
      return clone(result);
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
    return result;
  };

  return convert(value, null, []);
}

export {};
