/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildCarsAPIFor } from "@api/cars-api";
import { buildIncidentsAPIFor, rawIncidentFrom } from "@api/incidents-api";
import { schema } from "@api/schema";
import { Context, CustomContext } from "@api/server-types";
import RAW_CARS from "@data/cars.json";
import RAW_INCIDENTS from "@data/incidents.json";
import { Car, Incident } from "@generated-types/schema-types";
import { idFor } from "@utils/id-for";
import { makeUUID } from "@utils/make-uuid";
import { ApolloServer } from "apollo-server";
import { ApolloServerTestClient, createTestClient } from "apollo-server-testing";
import Chance from "chance";
// @ts-ignore
import MockReq from "mock-req";
// @ts-ignore
import MockRes from "mock-res";

// MOCK UTILS FOR TESTS

type MockContextParams = Partial<CustomContext> & { incidents?: Incident[]; cars?: Car[] };

function mockCustomContext(params: MockContextParams): CustomContext {
  const chance = params.chance ?? new Chance();
  return {
    chance,
    makeUUID: params.makeUUID ?? makeUUID,
    idFor: params.idFor ?? idFor,
    carsAPI: params.carsAPI ?? buildCarsAPIFor(params.cars ?? RAW_CARS),
    incidentsAPI: params.incidentsAPI ?? buildIncidentsAPIFor(params.incidents?.map(rawIncidentFrom) ?? RAW_INCIDENTS),
    makeFakeSentence: params.makeFakeSentence ?? (() => chance.sentence()),
  };
}

export function mockContext(params: MockContextParams = {}): Context {
  return {
    req: new MockReq() as Context["req"], // forcing this, we do not use it in tests
    res: new MockRes() as Context["res"], // forcing this, we do not use it in tests
    ...mockCustomContext(params),
  };
}

export function createTestApolloServer(params: MockContextParams = {}): ApolloServerTestClient {
  const server = new ApolloServer({
    schema,
    context: (): Context => mockContext(params),
    debug: true,
  });

  return createTestClient(server);
}
