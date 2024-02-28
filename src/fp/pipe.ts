export type Fn<Args extends any[] = any[], Return = any> = (
  ...args: Args
) => Return;

export interface PipeFunction {
  <A>(value: A): A;
  <A, B>(value: A, fn1: Fn<[A], B>): B;
  <A, B, C>(value: A, fn1: Fn<[A], B>, fn2: Fn<[B], C>): C;
  <A, B, C, D>(value: A, fn1: Fn<[A], B>, fn2: Fn<[B], C>, fn3: Fn<[C], D>): D;
  <A, B, C, D, E>(
    value: A,
    fn1: Fn<[A], B>,
    fn2: Fn<[B], C>,
    fn3: Fn<[C], D>,
    fn4: Fn<[D], E>,
  ): E;
  <A, B, C, D, E, F>(
    value: A,
    fn1: Fn<[A], B>,
    fn2: Fn<[B], C>,
    fn3: Fn<[C], D>,
    fn4: Fn<[D], E>,
    fn5: Fn<[E], F>,
  ): F;
  <A, B, C, D, E, F, G>(
    value: A,
    fn1: Fn<[A], B>,
    fn2: Fn<[B], C>,
    fn3: Fn<[C], D>,
    fn4: Fn<[D], E>,
    fn5: Fn<[E], F>,
    fn6: Fn<[F], G>,
  ): G;
}

export const pipe: PipeFunction = (initial: any, ...fns: Fn[]) => {
  return fns.reduce((a, c) => c(a), initial);
};
