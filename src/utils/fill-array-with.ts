export function fillArrayWith<T>(quantity: number, generator: (i: number) => T): T[] {
  const list: T[] = [];
  for (let i = 0; i < quantity; i++) {
    list[i] = generator(i);
  }
  return list;
}
