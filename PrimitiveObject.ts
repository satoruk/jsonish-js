export type PrimitiveObject = {
  [k: string]: any;
};

export function isPrimitiveObject(value: any): value is PrimitiveObject {
  if (value === null || typeof value !== "object") {
    return false;
  }
  return value.constructor === Object;
}

export function assertPrimitiveObject(
  value: any,
): asserts value is PrimitiveObject {
  if (!isPrimitiveObject(value)) {
    throw new TypeError("not primitive Object");
  }
}
