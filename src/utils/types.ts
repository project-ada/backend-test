import { Dayjs } from "@plandek-utils/ts-parse-dayjs";
import { isArray, isFunction, isObject } from "lodash";

export type SortDirections = "asc" | "desc";

export type TimePoint = { from: Dayjs; to: Dayjs };

export type PlainObjectValue =
  | undefined
  | null
  | boolean
  | number
  | string
  | PlainObjectValue[]
  | { [prop: string]: PlainObjectValue };

export type PlainObject = { [prop: string]: PlainObjectValue };

export type PlainObjectValueExtended<T> =
  | undefined
  | null
  | boolean
  | number
  | string
  | T
  | Array<PlainObjectValueExtended<T>>
  | { [prop: string]: PlainObjectValueExtended<T> };

export function isPlainObject(o: PlainObjectValue): o is Record<string, unknown> & PlainObject {
  return !!o && !isArray(o) && isObject(o) && !isFunction(o);
}

// from https://stackoverflow.com/questions/60111963/define-an-empty-object-type-in-typescript
export type EmptyObject = { [K in any]: never };
