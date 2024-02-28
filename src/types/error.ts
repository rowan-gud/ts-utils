export function asError(input: unknown): Error {
  if (input instanceof Error) {
    return input;
  }

  if (typeof input === 'string' || input === undefined || input === null) {
    return new Error(input ?? undefined);
  }

  if (typeof input === 'number' || typeof input === 'symbol') {
    return new Error(String(input));
  }

  return new Error(JSON.stringify(input));
}
