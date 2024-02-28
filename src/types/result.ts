import { asError } from './error';

export interface OkResult<T> {
  readonly ok: true;
  readonly data: T;
}

export type ErrResult<T = undefined> = T extends undefined
  ? { readonly ok: false }
  : {
      readonly ok: false;
      readonly error: T;
    };

export type Result<Data, Err = Error> = OkResult<Data> | ErrResult<Err>;

export function ok<T>(data: T): OkResult<T> {
  return {
    ok: true,
    data,
  };
}

export function err<T>(error: T): ErrResult<T> {
  return {
    ok: false,
    error,
  } as any;
}

export function mapData<Data, NewData, Err>(
  res: Result<Data, Err>,
  transformer: (data: Data) => NewData,
): Result<NewData, Err> {
  if (res.ok) {
    return ok(transformer(res.data));
  }

  return res;
}

export function mapErr<Data, Err, NewErr>(
  res: Result<Data, Err>,
  transformer: Err extends undefined ? () => NewErr : (error: Err) => NewErr,
): Result<Data, NewErr> {
  if (!res.ok) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return err(transformer((res as any).error));
  }

  return res;
}

export function unwrap<Data, Err>(res: Result<Data, Err>): Data {
  if (!res.ok) {
    throw new Error('Attempt to unwrap result which is not ok');
  }

  return res.data;
}

export function unwrapOr<Data, Err>(res: Result<Data, Err>, def: Data): Data {
  if (res.ok) {
    return res.data;
  }

  return def;
}

export function expect<Data, Err>(
  res: Result<Data, Err>,
  message: string,
): Data {
  if (!res.ok) {
    console.error(message);
    process.exit(1);
  }

  return res.data;
}

export function match<Data, Err, Res>(
  res: Result<Data, Err>,
  matcher: { ok: (data: Data) => Res; err: (e: Err) => Res },
): Res {
  if (res.ok) {
    return matcher.ok(res.data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return matcher.err((res as any).error);
}

export function trySync<Data>(fn: () => Data): Result<Data, Error> {
  try {
    return ok(fn());
  } catch (e) {
    return err(asError(e));
  }
}

export async function tryAsync<Data>(
  fn: () => Promise<Data>,
): Promise<Result<Data, Error>> {
  try {
    return ok(await fn());
  } catch (e) {
    return err(asError(e));
  }
}
