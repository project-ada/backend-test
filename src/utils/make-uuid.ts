import { v4 as uuidv4 } from "uuid";

export const makeUUID = (): string => uuidv4();
export type MakeUUIDFunction = typeof makeUUID;
