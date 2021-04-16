import { isNotNone } from "@plandek-utils/safe-compact";
import { every, isNil, some } from "lodash";

export function doesNotIncludeNils<T>(list: Array<T | null | undefined>): list is T[] {
  return every(list, isNotNone);
}

export function includeNils<T>(list: Array<T | null | undefined>): list is T[] {
  return some(list, isNil);
}
