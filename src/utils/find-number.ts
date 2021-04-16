import { get, isFinite, isNull, isNumber, isString, toNumber } from "lodash";
import { prettyJSON } from "./pretty-json";
import { PlainObject } from "./types";

/**
 * returns get(obj.path) if it is a number (or a string representation of a number),
 * throws an error otherwise
 *
 * @param obj object where to look the number
 * @param path string with the path where to find the number
 */
export function findNumberStrict(obj: PlainObject, path: string): number {
  const parsed = parse(obj, path);
  if (isNull(parsed)) {
    throw new Error(`findNumber failed for path ${path}, obj: ${prettyJSON(obj)}`);
  }

  return parsed;
}

/**
 * returns get(obj.path) if it is a number (or a string representation of a number),
 * return default otherwise
 *
 * @param obj object where to look the number
 * @param path string with the path where to find the number
 * @param defaultValue number to return if it is not properly parsed
 */
export function findNumber(obj: PlainObject, path: string, defaultValue: number): number {
  const parsed = parse(obj, path);
  if (isNull(parsed)) {
    return defaultValue;
  }

  return parsed;
}

function parse(obj: PlainObject, path: string): number | null {
  const value = get(obj, path);
  if (isNumber(value)) return value;

  if (isString(value)) {
    const parsed = toNumber(value);
    if (isFinite(parsed)) return parsed;
  }

  return null;
}
