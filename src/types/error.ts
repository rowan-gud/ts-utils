export function asError(input: unknown): Error {
  if (input instanceof Error) {
    return input;
  }

  if (typeof input === 'string' || input === undefined || input === null) {
    return new Error(input ?? undefined);
  }

  const str = String(input);

  if (str.includes('[object Object]')) {
    return new Error(JSON.stringify(input));
  }

  return new Error(str);
}
