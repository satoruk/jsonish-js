export type Primitive = string | number | boolean | null;

export function isPrimitive(value: any): value is Primitive {
  if (value === null) return true;

  switch (typeof value) {
    case "string":
    case "boolean":
      return true;
    case "number":
      return !isNaN(value);
    default:
      return false;
  }
}

export function assertPrimitive(value: any): asserts value is Primitive {
  if (!isPrimitive(value)) {
    throw new TypeError("not JSON primitive type");
  }
}
