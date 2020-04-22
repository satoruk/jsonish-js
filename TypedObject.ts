import difference from "lodash/difference";
import get from "lodash/get";
import isString from "lodash/isString";
import isUndefined from "lodash/isUndefined";
import keys from "lodash/keys";

import { JSONish } from "./JSONish";
import { isPrimitiveObject } from "./PrimitiveObject";

export type TypedObject<T extends JSONish> = {
  _type: string;
  _value: T;
};

export function isTypedObject(o: any): o is TypedObject<any> {
  try {
    assertTypedObject(o);
    return true;
  } catch (_e) {
    return false;
  }
}

export function assertTypedObject(o: any): asserts o is TypedObject<any> {
  if (!isPrimitiveObject(o)) {
    throw new TypeError("not TypedObject");
  }
  const propNames = keys(o);
  const remainders = difference(propNames, ["_type", "_value"]);
  if (remainders.length > 0) {
    const nameLabel = remainders.length === 1 ? "name" : "names";
    throw new TypeError(`Unknown property ${nameLabel}: ${remainders}`);
  }
  if (!isString(get(o, "_type"))) {
    throw new TypeError("'_type' should be a string type");
  }
  if (isUndefined(get(o, "_value"))) {
    throw new TypeError("'_value' should be not undefined");
  }
}
