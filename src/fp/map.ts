export function map<T extends any[], Res>(fn: (item: T[number]) => Res) {
  return (items: T): Res[] => {
    return items.map(fn);
  };
}
