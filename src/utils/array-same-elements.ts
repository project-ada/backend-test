import { isEqual, sortBy } from "lodash";

export function arraySameElements<T = any>(a: T[], b: T[]): boolean {
  return isEqual(sortBy(a), sortBy(b));
}
