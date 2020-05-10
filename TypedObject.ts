import difference from "lodash/difference";
import get from "lodash/get";
import isString from "lodash/isString";
import isUndefined from "lodash/isUndefined";
import keys from "lodash/keys";

import { JSONish } from "./JSONish";
import { isPrimitiveObject } from "./PrimitiveObject";

export type TypedObject<N extends string, T extends JSONish> = {
  /** type name */
  _t: N;
  /** value */
  _v: T;
};

/**
 * To create TypedObject
 *
 * ```
 * type Sample = TypedObject<"Sample", string>;
 * const result: Sample = createTypedObject("Sample", "sample value");
 * ```
 *
 * @param name String literal
 * @param value
 */
export function createTypedObject<N extends string, T extends JSONish>(
  name: N,
  value: T,
): TypedObject<N, T> {
  return { _t: name, _v: value };
}

export function isTypedObject(o: any): o is TypedObject<any, any> {
  try {
    assertTypedObject(o);
    return true;
  } catch (_e) {
    return false;
  }
}

export function assertTypedObject<N extends string>(
  o: any,
): asserts o is TypedObject<N, any> {
  if (!isPrimitiveObject(o)) {
    throw new TypeError("not TypedObject");
  }
  const propNames = keys(o);
  const remainders = difference(propNames, ["_t", "_v"]);
  if (remainders.length > 0) {
    const nameLabel = remainders.length === 1 ? "name" : "names";
    throw new TypeError(`Unknown property ${nameLabel}: ${remainders}`);
  }
  if (!isString(get(o, "_t"))) {
    throw new TypeError("'_t' should be a string type");
  }
  if (isUndefined(get(o, "_v"))) {
    throw new TypeError("'_v' should be not undefined");
  }
}
