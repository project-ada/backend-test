import { camelCase, isPlainObject, mapKeys, mapValues } from "lodash/fp";

type Callback = (x: string) => string;

// adapted from https://github.com/glennreyes/map-keys-deep/blob/master/fp.js
const mapKeysDeep = (cb: Callback) => (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(mapKeysDeep(cb));
  if (isPlainObject(obj)) return mapValues(mapKeysDeep(cb))(mapKeys(cb)(obj));
  return obj;
};

export const camelKeysDeep = mapKeysDeep(camelCase);
