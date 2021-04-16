import { Context, ExpressContext } from "@api/server-types";
import { idFor } from "@utils/id-for";
import { makeUUID } from "@utils/make-uuid";
import Chance from "chance";

export async function buildContext(session: ExpressContext): Promise<Context> {
  const chance = new Chance();
  return {
    ...session,
    makeUUID,
    idFor,
    chance,
    makeFakeSentence: () => chance.sentence(),
  };
}
