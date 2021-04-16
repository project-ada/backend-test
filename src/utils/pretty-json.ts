import colorizeJson from "json-colorizer";

export function prettyJSON(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}

export function colorPrettyJSON(obj: unknown): string {
  return colorizeJson(prettyJSON(obj));
}
