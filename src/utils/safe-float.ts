import { isArray, isFinite, isNumber, isString } from "lodash";

export function safeFloat(arg: unknown): number {
  if (isNumber(arg) && isFinite(arg)) return arg;
  if (isArray(arg)) return safeFloat(arg[0]);
  if (!isString(arg)) return 0;

  // try to parse it
  const parsed = parseFloat(arg);
  return isFinite(parsed) ? parsed : 0;
}
