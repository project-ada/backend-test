import { Context, ExpressContext } from "@api/server-types";
import { idFor } from "@utils/id-for";
import { makeUUID } from "@utils/make-uuid";
import Chance from "chance";

export async function buildContext(session: ExpressContext): Promise<Context> {
  return {
    ...session,
    makeUUID,
    idFor,
    chance: new Chance(),
  };
}
