import { Dayjs } from "@plandek-utils/ts-parse-dayjs";
import { SortDirections } from "@utils/types";

export function makeSortWithTieBreaker<T, V>(params: {
  valueFromFn: (x: T) => V;
  compareValuesFn: (valA: V, valB: V) => number;
  tieBreakerFn?: (a: T, b: T) => number;
  direction?: SortDirections;
}): (a: T, b: T) => number {
  return function sortByValue(a, b) {
    const valA = params.valueFromFn(a);
    const valB = params.valueFromFn(b);
    const res = params.compareValuesFn(valA, valB);
    if (res === 0 && params.tieBreakerFn) {
      return params.tieBreakerFn(a, b);
    }

    return params.direction === "desc" ? res * -1 : res;
  };
}

export function makeSortByNestedDate<T>(params: {
  dateFromFn: (x: T) => Dayjs | null;
  tieBreakerFn?: (a: T, b: T) => number;
  direction?: SortDirections;
}): (a: T, b: T) => number {
  return makeSortWithTieBreaker({
    compareValuesFn: (va: Dayjs | null, vb: Dayjs | null) => {
      if (!va && !vb) return 0;
      if (!va) return -1;
      if (!vb) return 1;
      return va.diff(vb);
    },
    valueFromFn: params.dateFromFn,
    tieBreakerFn: params.tieBreakerFn,
    direction: params.direction,
  });
}

export function makeSortListSync<T>(sortFn: (a: T, b: T) => number): (list: T[]) => T[] {
  return function sortList(list) {
    const l = [...list];
    l.sort(sortFn);
    return l;
  };
}

export function makeSortListAsync<T>(sortFn: (a: T, b: T) => number): (list: T[]) => Promise<T[]> {
  return function sortListAsync(list) {
    const l = [...list];
    l.sort(sortFn);
    return Promise.resolve(l);
  };
}
