export function createUnknownPropertyTypeMessage(
  value: any,
  path: (string | number)[],
) {
  const suffix = path.length === 0 ? "" : ` at ${path.join(".")}`;
  let str: string;

  if (value !== null && typeof value === "object") {
    const name = value.constructor.name;
    str = `${name}("${value}")`;
  } else {
    str = `${value}`;
  }

  return `Unknown property type(${str})${suffix}`;
}
