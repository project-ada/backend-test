import { isArray, isFinite, isNumber, isString, map } from "lodash";

export function safeFloat(arg: unknown): number {
  if (isNumber(arg) && isFinite(arg)) return arg;
  if (isArray(arg)) return safeFloat(arg[0]);
  if (!isString(arg)) return 0;

  // try to parse it
  const parsed = parseFloat(arg);
  return isFinite(parsed) ? parsed : 0;
}

export function safeFloatWithDefault(arg: unknown, defaultValue: number | null): number | null {
  if (isNumber(arg) && isFinite(arg)) return arg;
  if (isArray(arg)) return safeFloatWithDefault(arg[0], defaultValue);
  if (!isString(arg)) return defaultValue;

  // try to parse it
  const parsed = parseFloat(arg);
  return isFinite(parsed) ? parsed : defaultValue;
}

export function safeFloats(arg: unknown): number[] {
  const list = isArray(arg) ? arg : [arg];
  return map(list, safeFloat);
}
