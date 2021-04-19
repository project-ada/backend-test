import { createHash } from "crypto";
import sortKeys from "sort-keys";

export type IdForFn = (prefix: string, input: Readonly<Record<string, unknown>>) => string;

export const idFor: IdForFn = (prefix, input) => {
  const json = sortedJSONFor(input);
  const hash = hashFromJSON(json);

  return `${prefix}--${hash}`;
};

// internal utils for implementation

function sortedJSONFor(input: Record<string, unknown>): string {
  return JSON.stringify(sortKeys(input, { deep: true }));
}

const REGEX_BASE64_URL = /[=+\/]/g;
const BASE64_URL_REPLACEMENT_MAP: Record<string, string> = {
  "/": "_",
  "+": "-",
  "=": "",
};

/**
 * returns a base64-url encoding of the sha1 of the given json
 * @param json
 */
function hashFromJSON(json: string): string {
  const b64 = createHash("sha1").update(json).digest("base64");
  return b64.replace(REGEX_BASE64_URL, (x) => BASE64_URL_REPLACEMENT_MAP[x]);
}
