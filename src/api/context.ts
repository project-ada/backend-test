import { Context, ExpressContext } from "@api/server-types";
import RAW_INCIDENTS from "@data/incidents.json";
import { idFor } from "@utils/id-for";
import { makeUUID } from "@utils/make-uuid";
import Chance from "chance";
import { buildIncidentsAPIFor } from "./incidents-api";

export async function buildContext(session: ExpressContext): Promise<Context> {
  const chance = new Chance();
  return {
    ...session,
    makeUUID,
    idFor,
    chance,
    incidentsAPI: buildIncidentsAPIFor(RAW_INCIDENTS),
    makeFakeSentence: () => chance.sentence(),
  };
}
