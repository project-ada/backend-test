import { every, isArray, isUndefined, List, ListIterateeCustom, ListIterator, sample, some, without } from "lodash";

export const anyOf = some;
export const allOf = every;

export function pickRandom<T>(collection: List<T>): T {
  if (!collection.length) {
    throw "Cannot be a blank collection";
  }

  const x = sample(collection);
  if (isUndefined(x)) {
    throw "Cannot be a blank collection";
  }

  return x;
}

export function noneOf<T>(collection: List<T> | null | undefined, predicate?: ListIterateeCustom<T, boolean>): boolean {
  return !anyOf(collection, predicate);
}

export function findAndRemove<T>(list: T[], predicate: ListIterator<T, boolean>): [T | undefined, T[]] {
  const found = list.find(predicate);
  const rest = isUndefined(found) ? list : without(list, found);

  return [found, rest];
}

export function isArrayOf<T extends L, L = unknown>(list: unknown, predicate: (x: L) => x is T): list is T[] {
  if (!isArray(list)) return false;

  if (list.length === 0) return true;
  return allOf(list, predicate);
}
