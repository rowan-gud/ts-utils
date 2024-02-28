import { type ErrResult, type OkResult } from './result';

export type Option<T> = OkResult<T> | ErrResult;

export function some<T>(data: T): OkResult<T> {
  return {
    ok: true,
    data,
  };
}

export function none(): ErrResult {
  return {
    ok: false,
  };
}
