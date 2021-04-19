import { Car, Incident } from "@generated-types/schema-types";
import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import { createTestApolloServer } from "@utils/mocks";
import { gql } from "apollo-server";

describe("⚡️⚡️⚡️⚡️ TECH TEST: EXERCISE ⚡️⚡️⚡️⚡️", () => {
  describe("exercise 1: metric", () => {
    const QUERY = gql`
      {
        # CHANGE ME FOR THE REAL QUERY
        metric: ping
      }
    `;

    it("metric test", async () => {
      const incidents: Incident[] = [
        { id: "i-1", carID: "car-1", severity: 1, date: parseDayjsOrError("2020-01-01") },
        { id: "i-2", carID: "car-1", severity: 3, date: parseDayjsOrError("2020-01-01") },
        { id: "i-3", carID: "car-1", severity: 5, date: parseDayjsOrError("2020-01-01") },
      ];

      const cars: Car[] = [{ id: "car-1", colour: "red", model: "whatever", type: "a car" }];

      // creates a test server with the given `incidents` and `cars` as the data that will be returned by
      // `context.incidentsAPI.loadIncidents()` and `context.carsAPI.loadCars()` respectively
      const { query } = createTestApolloServer({ incidents, cars });

      // run query against the server and snapshot the output
      const res = await query({
        query: QUERY,
      });
      expect(res.errors).toBeNil();
      expect(res.data.metric.id).toBeString();
      expect(res.data.metric.averageSeverity).toEqual(3);
    });
  });

  describe("exercise 2", () => {
    it.todo("ask the interviewer about the requirements for the second exercise");
  });
});
